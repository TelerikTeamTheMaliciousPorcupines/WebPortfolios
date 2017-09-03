export class Message {

    constructor(message: any) {
        this.to = !!message.to ? message.to : '';
        this.from = !!message.from ? message.from : '';
        this.text = !!message.text ? message.text : '';
        this.isNew = true;
    }
    public to: string;
    public from: string;

    public text: string;

    public isNew: boolean;
}