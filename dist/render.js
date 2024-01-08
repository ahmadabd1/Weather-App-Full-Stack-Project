class Render{
    constructor(){
        this.source = $("#template").html()
        this.template = Handlebars.compile(this.source)
    }
    displayTheWeathers(data){
        
        let someHTML = this.template({data:data})
        divDisplay.append(someHTML)
    }
}