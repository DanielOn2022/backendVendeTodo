import { Packer } from "../Packer/Packer";
import { SaleLine } from "../SaleLine/SaleLine";
import { Section } from "../Section/Section";

export class PackingRoute {

  private steps: {section: Section, saleLine: SaleLine}[];
  private lastItem: number;
  private packer: Packer;
  private saleid: number;
  private packed: boolean;
  private route?: {section: Section, saleLine: SaleLine}[] | null;
  private unStoredProducts?: SaleLine[] | null;

  constructor(data: {
    steps: {section: Section, saleLine: SaleLine}[];
    packer: Packer;
    saleid: number;
    unStoredProducts?: SaleLine[] | null;
  }) {
    this.steps = data.steps;
    this.packer = data.packer;
    this.saleid = data.saleid;
    this.packed = false;
    this.lastItem = 0;
    this.route = [];
    this.unStoredProducts = data.unStoredProducts;
  }

  setDefaultroute(): void {
    this.route = this.steps;
  }

  sortRoute(): boolean {
    if (!this.route?.length) return false;
    const stepsClone = [...this.steps];
    this.sort({shelf: this.packer.packerSnapshot.startingPoint, section: 0});
    if (this.unStoredProducts) this.unStoredProducts.forEach(saleLine => this.route?.push({section: new Section({capacity: 0, product:saleLine.snapshot.product, shelfId: 0}), saleLine}));
    this.steps = stepsClone;
    return true;
  }

  checkProduct(productPayload: {productId: number, supplierId: number, batchId: number}): boolean {
    const {batchId, productId, supplierId} = productPayload;
    if (this.packed) return true;

    if (!this.route) throw new Error('The route has not been sorted yet');
    const currentStep = this.route[this.lastItem];
    const currentProduct = currentStep.saleLine.snapshot.product;
    if (currentStep.saleLine.snapshot.batchId === batchId && currentProduct.snapshot.id === productId && currentProduct.snapshot.suppliers[0].snapshot.id === supplierId) {
        this.increateLastItem();
        return true;
    }
    return false;
  }

  private increateLastItem(): void {
    this.lastItem = this.lastItem+1;
    if (this.lastItem === this.route?.length) {
      this.packed = true; 
      this.lastItem = 0;
    }
  }

  getSteps(): {section: Section, saleLine: SaleLine}[] | null {
    if (this.packed) return this.steps;
    return null;
  }

  getSaleId(): number {
    return this.saleid;
  }

  private sort(currentPoint: {shelf: number, section: number}) {
    let nearest = {index: 0, effort: this.steps[0].section.snapshot.shelfId + (this.steps[0].section.snapshot.sectionNumber as number)};
    const currentValue = currentPoint.section + currentPoint.shelf;
    let index = 1;
    while(index < this.steps.length){
      const stepValue = this.steps[index].section.snapshot.shelfId + (this.steps[index].section.snapshot.sectionNumber as number);
      const effort = Math.abs(currentValue - stepValue);
      if (effort < nearest.effort) nearest = {index, effort};
      index++;
    }
    this.route?.push(this.steps[nearest.index]);
    this.steps.splice(nearest.index, 1);
    if (!this.steps.length) return;
    this.sort({shelf: this.route[this.route?.length-1].section.snapshot.shelfId, section: this.route[this.route?.length-1].section.snapshot.sectionNumber});
  }

  getCurrentProduct() {
    if (this.route)
      return this.route[this.lastItem];
    return null;
  }

}
