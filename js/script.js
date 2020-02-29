// global variables
let departureInput = jQuery("#departure"),
    arrivalInput = jQuery("#arrival");

jQuery(document).ready(() => {
    departureInput.on("keyup click", event_trigger);
    arrivalInput.on("keyup click", event_trigger);
});

function event_trigger(e) {
    let param = e.target.value,
        outputTarget;
        
    if (param.length > 1 && param != " ") {
        if (jQuery(e.target).is("#departure")) {
            outputTarget = jQuery(".bu_departure-output")[0];
        } else if (jQuery(e.target).is("#arrival")) {
            outputTarget = jQuery(".bu_arrival-output")[0];
        };

        jQuery(departureInput).focus(() => {
            jQuery(".bu_arrival-output").css("display", "none");
        });
        
        jQuery(arrivalInput).focus(() => {
            jQuery(".bu_departure-output").css("display", "none");
        });

        data_output(param, outputTarget);
    };
}

async function data_output(param, outputContainer) {
    await fetch(`https://booking-engine.fare33.com/api/airport/autocomplete?term=${param}`)
    .then(async response => response.json())
    .then(datas => {
        jQuery(outputContainer).empty();
        jQuery(outputContainer).css("display", "none");

        if (datas.length > 0) {
            for (data of datas) {
                set_item(outputContainer, data);
            };

            jQuery(outputContainer).css("display", "block");
            select_data(outputContainer);
            hide_output(outputContainer);
        } else {
            jQuery(outputContainer).css("display", "none");
            return 0;
        }
    });
};

function set_item(parentOutput, data) {
    let newLiElement = document.createElement("li"),
        {Name, Country} = data;

    newLiElement.append(`${Name}, ${Country}`);

    if (jQuery(parentOutput).is(".bu_departure-output")) {
        jQuery(parentOutput).append(newLiElement);
    } else if (jQuery(parentOutput).is(".bu_arrival-output")) {
        jQuery(parentOutput).append(newLiElement);
    };
};

function select_data(outputContainer) {
    let parentChilds = jQuery(outputContainer).children();
    
    parentChilds.click(e => {
        if (jQuery(outputContainer).is(".bu_departure-output")) {
            departureInput[0].value = e.currentTarget.innerText;
        } else if (jQuery(outputContainer).is(".bu_arrival-output")) {
            arrivalInput[0].value = e.currentTarget.innerText;
        };
        
        jQuery(outputContainer).css("display", "none");
    });
};

function hide_output(outputContainer) {
    let allElements = jQuery("*");

    allElements.click(e => {
        jQuery(outputContainer).css("display", "none");
    });
};