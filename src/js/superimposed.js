class ConsoleSuperimposed {
    constructor(params) {;
        this.id = params.targetId;
        this.dom = document.getElementById(params.targetId);
        this.prop = params.data;
        this.data = {
            right: 100,
            right90: 120,
            left: 1000,
            left90: 1000,
            front: 5555,
            gyro: 0.011,
            battery: 100
        }
    }
    update(data) {
        this.data = data;
    }
    apply() {
        var self = this;
        var keys = Object.keys(this.data);

        var divs = self.dom.querySelectorAll("div");
        divs.forEach((element) => {
            element.parentNode.removeChild(element);
        });

        keys.forEach(function (ele, inde, array) {
            var div = document.createElement("div");
            div.innerText = self.data[ele];
            var prop = self.prop[ele];
            div.style.position = "absolute";
            if (prop.right) {
                div.style.right = prop.right + "px";
            }
            if (prop.top) {
                div.style.top = prop.top + "px";
            }
            if (prop.left) {
                div.style.left = prop.left + "px";
            }
            if (prop.bottom) {
                div.style.bottom = prop.bottom + "px";
            }
            div.style.color = "red";
            div.style.fontSize = 22 + "px";
            div.style.backgroundColor = "#dddddd";
            
            self.dom.appendChild(div);
        });
    }
}