
  // Creating a new element named template
const template = document.createElement('template');
//styling of web component and Html layout
template.innerHTML= `
    <style>

    .user-card{
        font-family: 'Inter', sans-serif;
        padding: 10px 10px;
        background-color: white;
        border: 1px solid #bacdd8;
        width: 500px;
        display: grid;
        grid-template-columns: 1fr 2fr;
        grid-gap: 10px;
        margin-bottom: 30px;
        margin-left: 30px;
        border-left:  7px solid #2a9d8f;
        border-radius: 5px;
        box-shadow: 0 4px 6px rgba(153,153,153,.3);
    }

    .user-card img {
        width: 100%;

    }

    .user-card button {
        cursor: pointer;
        background: #e76f51;
        color: #fff;
        border: 0;
        border-radius: 5px;
        padding: 5px 10px;
    }

    .info{
        display: none;
    }
    h3 {
        color: #264653;
        font-size: 30px;
     }
    </style>


    <div class="user-card">

     <img />

     <div>
        <h3></h3>

        <div class="info">
        <p><slot name="email" /></p>
        <p><slot name="phone" /></p>
        </div>

        <button id="toggle-info">Show Info</button>
    </div>
    </div>

    `;

//Leave between the h3 tag empty, will call the shadow root below. 

class UserCard extends HTMLElement{
    //constructor allows for it to be run right away
    constructor(){
        super();

        //setting property below, show info for button by default
        this.showInfo = true;
        
        //Creates a shadow dom so you can adjust the element to be styled for just this component
        this.attachShadow({ mode: 'open'});
        this.shadowRoot.appendChild(template.content.cloneNode(true));
        this.shadowRoot.querySelector('h3').innerText=
        this.getAttribute('name');
        this.shadowRoot.querySelector('img').src=
        this.getAttribute('avatar');
        
    }

    // When the button is clicked, which currently is set by default as who above in the property.
    toggleInfo(){
        this.showInfo = !this.showInfo;

        //Creating variables for if and else statement to show and hide information
        const info = this.shadowRoot.querySelector('.info');
        const toggleBtn = this.shadowRoot.querySelector('#toggle-info');

        if(this.showInfo){
            info.style.display= 'none';
            toggleBtn.innerText = 'Show Info';
        }
        else {
           
            info.style.display= 'block';
            toggleBtn.innerText = 'Hide Info';
        }
    }

    connectedCallback() {
        this.shadowRoot.querySelector('#toggle-info').
        addEventListener('click', () => this.toggleInfo());
    }

    disconnectedCallback(){
        this.shadowRoot.querySelector('#toggle-info').
        removeEventListener();

    }

}

// This defines the custom element  -by pulling class information and outputting it through the tag on the index.html

window.customElements.define('user-card', UserCard); 
// You will see John Doe when you refresh your page. 