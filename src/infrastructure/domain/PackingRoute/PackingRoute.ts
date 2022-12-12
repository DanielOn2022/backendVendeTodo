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

  constructor(data: {
    steps: {section: Section, saleLine: SaleLine}[];
    packer: Packer;
    saleid: number;
  }) {
    this.steps = data.steps;
    this.packer = data.packer;
    this.saleid = data.saleid;
    this.packed = false;
    this.lastItem = 0;
  }

  sortRoute() {
    //use the steps attribute to determine the order in the route
  }

  checkProduct(productPayload: {productId: number, supplierId: number, batchId: number}): boolean {
    const {batchId, productId, supplierId} = productPayload;
    if (this.packed) return true;

    if (!this.route) throw new Error('The route has not been sorted yet');
    const currentStep = this.route[this.lastItem];
    const currentProduct = currentStep.section.snapshot.product;
    if (currentStep.saleLine.snapshot.batchId === batchId && currentProduct.snapshot.id === productId && currentProduct.snapshot.suppliers[0].snapshot.id === supplierId) {
        this.increateLastItem();
        return true;
    }
    return false;
  }

  private increateLastItem(): void {
    this.lastItem = this.lastItem+1;
    if (this.lastItem === this.route?.length)
      this.packed = true
  }

  getSteps(): {section: Section, saleLine: SaleLine}[] | null {
    if (this.packed) return this.steps;
    return null;
  }

}
