var Mode = (function () {

    /*
        Multi button event handler
    */
    this.multiButtonHandler = function () {
        this.startMulti();
    }

    /*
        Single button event handler
    */
    this.singleButtonHandler = function () {
        this.startSingle();
    }


    this.init = function () {
        //attaching event handlers
        this.singleButton.addEventListener('click', this.singleButtonHandler.bind(this));
        this.multiButton.addEventListener('click', this.multiButtonHandler.bind(this));
    }


    return {
        init: this.init.bind(this)
    }
})()