export class SelectedArray {
    
    private selected_array: Array<any>;

    constructor() {
        this.selected_array = [];
    }

    public deleteElem(val) {
        var new_arr = [];
        for ( var i = 0; i < this.selected_array.length; i++ ) {
            if ( this[i] !== val ) {
                new_arr.push(this[i]);
            }
        }
        return new_arr;
    }

    public push(val) {
        this.selected_array.push(val);
        return this.selected_array;
    }

}