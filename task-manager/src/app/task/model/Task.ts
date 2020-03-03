export class Task{
    public _id: string;
    public task: string;
    public parent_id: string;
    public priority: number = 0;
    public start_date: Date;
    public end_date: Date;
    constructor(){}
}