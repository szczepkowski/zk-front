export class ProductRequest {


  constructor(private categoryName: string,
              private title: string,
              private text: string,
              private price: number,
              private quantity: number) {

  }
}
