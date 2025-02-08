export class Phone {
    private readonly value: string;

    constructor(value: any){
        if(!/^(\+?\d{1,3}[- ]?)?\d{10}$/.test(value)){
            throw new Error("Phone number invalid")
        }
        this.value = value;
    }
}