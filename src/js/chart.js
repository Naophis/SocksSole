class ConsoleChart {
    constructor(param) {
        this.id = param.targetId;
        this.rate = param.widthRate || 1;
        this.width = $(`#${this.id}`).parent().width() * this.rate;
        this.maxlength = param.maxlength;

        $(`#${this.id}`).highcharts({
            chart: {
                width: this.width,
                height: 200
            },
            series: [],
            plotOptions: {
                line: {
                    animation: false
                }
            },
            title: {
                text: ""
            }
        });
        this.list = [];
        this.keylist = [];
    }

    append(key, newdata) {
        var tmp = this.list.filter((ele) => {
            return ele.name === key;
        });
        if (tmp.length === 0) {
            this.list.push({
                name: key,
                data: [newdata]
            });
            this.keylist.push(key)
            return;
        }
        if (this.maxlength) {
            if (this.maxlength <= tmp[0].data.length) {
                tmp[0].data.shift();
            }
        }
        var self = this;
        this.list.forEach(function (ele, index) {
            if (ele.name === key) {
                tmp[0].data.push(newdata);
                self.list[index] = {
                    name: key,
                    data: tmp[0].data
                };
            }
        });
    }

    update(exceptlist) {
        var tmp = this.list.filter((ele) => {
            if (exceptlist.length > 0) {
                return !(exceptlist.indexOf(ele.name) >= 0);
            }
            return true;
        });
        if (tmp.length === 0) {
            return;
        }
        this.width = $(`#${this.id}`).parent().width() * this.rate;

        $(`#${this.id}`).highcharts({
            chart: {
                width: this.width,
                height: 350
            },
            series: tmp,
            plotOptions: {
                line: {
                    animation: false
                }
            },
            title: {
                text: ""
            }
        });
    }

}