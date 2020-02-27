jQuery(document).ready(() => {
    let departureInput = jQuery("#departure"),
        arrivalInput = jQuery("#arrival"),
        departureOutput = jQuery(".bu_departure-output")[0],
        arrivalOutput = jQuery(".bu_arrival-output")[0];

    departureInput.keydown(e => {
        let param = e.target.value;
            
        if (param.length > 1 && param != " ") {
            let allData = get_data(param);

            allData.then(datas => {
                console.log("datas");
                console.log(datas.length);

                for (data of datas) {
                    set_item(departureOutput, data);
                }
            });
        }
    });
});

async function get_data(param) {
    let response = await fetch(`https://booking-engine.fare33.com/api/airport/autocomplete?term=${param}`);
    let datas = await response.json();

    return datas;
};

function set_item(parent, data) {
    let newLiElement = document.createElement("li"),
        parentChilds = jQuery(parent).children(),
        {City} = data;

    console.log("parentChilds.length")
    console.log(parentChilds.length)

    for (child of parentChilds) {
        if (child.innerHTML == City) {
            return 0;
        };
    };

    newLiElement.append(data.City);

    if (jQuery(parent).is(".bu_departure-output")) {
        jQuery(parent).append(newLiElement);
    } else if ((jQuery(parent).is(".bu_arrival-output"))) {
        jQuery(parent).append(newLiElement);
    };
    
};