const options = {
    year: "numeric",
    month: "2-digit",
    day: "numeric",
    hour: 'numeric',
    minute: 'numeric',
    second:'numeric'
};

class Render{
    constructor(){
        this.source = $("#template").html()
        this.template = Handlebars.compile(this.source)
        this.source1 = $("#templocat").html()
        this.template1 = Handlebars.compile(this.source1)
    }
    displayTheWeathers(data){
        for(let i of data){
        const lastUpdated = new Date(i.date);
        i.date = lastUpdated.toLocaleDateString('en-US', options)
        }
        let someHTML = this.template({data:data})
        divDisplay.append(someHTML)
    }
    displayMyLocateWeathers(data){
        // $("#mywe").empty()
        const lastUpdated = new Date(data.date);
        data.date = lastUpdated.toLocaleDateString('en-US', options)
        let someHTML = this.template1(data)
        $("#locat").append(someHTML)
    }
}