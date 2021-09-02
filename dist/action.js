var instances = document.getElementsByClassName("card-container");
var cards = [];

for(i = 0; i < instances.length; i++) 
{
    if(i < 6)
        cards[i] = new Card(false, instances[i], 1.1, false);
    else
        cards[i] = new Card(false, instances[i], 1.05, true);
}

function Card(turned, instance, maxScale, boxShadow)
{
    this.turned = turned;
    this.instance = instance;
    this.maxScale = maxScale;
    this.boxShadow = boxShadow;

    var turnBack;
    var rotY = 0;
    var scale = 1;

    function updateTransform(instance) {
        instance.style.transform = `rotateY(${rotY}deg) scale(${scale})`;
    }

    function turnToFront(instance) {
        rotY = 0;
        clearTimeout(turnBack);
        turned = false;

        if(boxShadow)
            instance.style.boxShadow = "10px 10px 5px rgba(0, 0, 0, 0.25)";
    }

    function turnToBack(instance) {
        rotY = 180;
        turned = true;

        if(boxShadow)
            instance.style.boxShadow = "-10px 10px 5px rgba(0, 0, 0, 0.25)";
    }

    this.instance.addEventListener('click', () =>{
        turned ? turnToFront(this.instance) : turnToBack(this.instance);

        
        updateTransform(this.instance);
    });

    this.instance.addEventListener('mouseleave', () => {
        if(turned == true)
        {
            turnBack = setTimeout(() => {
                turnToFront(this.instance);
                updateTransform(this.instance);
            }, 8000);
        }
    });

    this.instance.addEventListener('mouseenter', () => {
        scale = maxScale;
        updateTransform(this.instance);
    });

    this.instance.addEventListener('mouseleave', () => {
        scale = 1;
        updateTransform(this.instance);
    });

    if(boxShadow)
        instance.style.boxShadow = "10px 10px 5px rgba(0, 0, 0, 0.25)";
}
