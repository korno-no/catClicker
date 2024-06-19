
console.log('lalal')

class Cat {
    constructor(id, name,imgUrl) {
        this.id = id,
        this.name = name,
        this.clickCounter = 0,
        this.clickHandler = false,
        this.imgUrl = imgUrl
    }
}

let model = {
    init: function(){
        this.cat1 = new Cat(1, 'Barsik', './img/cat1.jpg');
        this.cat2 = new Cat(2, 'Kotik',  './img/cat2.jpg');
        this.cat3 = new Cat(3, 'Markiz', './img/cat3.jpg');
        this.cat4 = new Cat(4, 'Kokos',  './img/cat4.jpg');
        this.cat5 = new Cat(5, 'Begemot','./img/cat5.jpg');
        return this.cat1
    },
    getAllCats: function() {
        return [this.cat1, this.cat2, this.cat3, this.cat4, this.cat5];
    },
}

let octopus = {
    init: function (){
        this.cat = model.init();
        catView.init();
        catListView.init();
        adminView.init();
    },
    getCats: function() {
        return model.getAllCats()
    },
    setCurrentCat: function(cat){
        this.cat = cat
        catView.render()
    },
    getCurrentCat: function(){
        return this.cat
    },
    increaseCounter: function() {
        this.cat.clickCounter ++
        catView.render()
    },
    // update cat data with Admin panel
    updateCatData: function(name, clicks, url){
        this.cat.name = name;
        this.cat.clickCounter = clicks;  
        this.cat.imgUrl = url;
        catListView.clean()
        catListView.render();
        catView.render();
    }
}

let catView = {
    init: function (){
        this.catPreview = document.getElementById('cat-preview');
        this.catImg = document.getElementById('cat-img');
        this.catCounter = document.getElementById('cat-counter');

        this.catImg.addEventListener('click', ()=>{
            octopus.increaseCounter();
        })
        this.render();
    },

    render: function(){
        const currentCat = octopus.getCurrentCat()
        this.catImg.setAttribute("src",currentCat.imgUrl);
        this.catCounter.innerHTML = currentCat.clickCounter;
    },
}
let catListView = {
    init: function(){
        this.catList = document.getElementById('cat-list');
        this.render();
    },
    render: function(){
        octopus.getCats().forEach(cat => {
            const catButton = document.createElement("button");
            catButton.innerHTML = cat.name;
            catButton.addEventListener('click', (function(catCopy) {
                return function(){
                    octopus.setCurrentCat(catCopy);
                    catView.render();
                    adminView.clear();
                }
            })(cat))
            this.catList.appendChild(catButton);
        });
    },
    clean: function(){
        this.catList.innerHTML = ''
    }
}


let adminView ={
    init: function(){
        this.adminBtn = document.getElementById('admin-btn');
        this.adminPanel = document.getElementById('admin-panel');
        this.submitBtn = document.getElementById('submit');
        this.closeBtn = document.getElementById('close-admin-btn');
        this.catName = document.getElementById('cat-name-field');
        this.imgUrl = document.getElementById('cat-img-field');
        this.catClicks = document.getElementById('cat-clicks-field');

        this.adminBtn.addEventListener('click', ()=>{
            this.render();
        });
        this.closeBtn.addEventListener('click', (event)=>{
            event.preventDefault();
            this.clear();
        });
        
    },
    render: function(){
        let newCat =  octopus.getCurrentCat()
        this.adminPanel.style.display = 'flex';
        this.catName.value = newCat.name
        this.imgUrl.value = newCat.imgUrl
        this.catClicks.value = newCat.clickCounter

        this.submitBtn.addEventListener('click',(event)=>{
            event.preventDefault();
            octopus.updateCatData( this.catName.value, this.catClicks.value, this.imgUrl.value)
        })
    },
    clear: function(){
        this.adminPanel.style.display = 'none';
    }
}
octopus.init()