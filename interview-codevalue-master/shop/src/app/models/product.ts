export class Product {
    id: number;
    name: string;
    description: string;
    createdAt: string;
    price: number;
    image: string;

    /**
     *
     */
    constructor(id: number, name: string, description: string, price: number, image: string, createdAt: string) {
        this.Id = id;
        this.Price = price;
        this.Name = name;
        this.Description = description;
        this.Image = image;
        this.CreatedAt = createdAt;
    }

    public set Id(id: number) {
        this.id = id;
    }

    public get Id(): number {
        return this.id
    }

    public set Price(price: number) {
        this.price = price;
    }

    public get Price(): number {
        return this.price
    }

    public set Name(name: string) {
        this.name = name;
    }

    public get Name(): string {
        return this.name
    }

    public set Description(description: string) {
        this.description = description;
    }

    public get Description(): string {
        return this.description
    }

    public set Image(image: string) {
        this.image = image;
    }

    public get Image(): string {
        return this.image
    }

    public set CreatedAt(createdAt: string) {
        this.createdAt = createdAt;
    }

    public get CreatedAt(): string {
        return this.createdAt
    }

}
