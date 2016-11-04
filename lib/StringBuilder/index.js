import autobind from 'class-autobind';

export default class StringBuilder {
    constructor(baseString, formatString) {
        autobind(this);

        this.baseString = baseString;
        this.formatString = formatString;
        this.workingString = this.baseString;
    }

    setSuffix(str) {
        this.workingString = this.baseString + str + '/' + this.formatString;
        return this.toString();
    }

    toString() {
        return this.workingString;
    }
}
