import { LightningElement, wire } from 'lwc';
import getOpportunities from '@salesforce/apex/OpportunityController.getOpportunities';
import { refreshApex } from '@salesforce/apex';

export default class OpportunityCardParent extends LightningElement {
    lstOfOppRecs;
    //bln
    //str
    //int

    connectedCallback() {
        console.log('OpportunityCardParent::connectedCallback_V_0.1 ');
    }

    @wire(getOpportunities)
    wiredOpportunities({data, error}) {
        if (data) {
            console.log('OpportunityCardParent::data ' + JSON.stringify(data));
            this.lstOfOppRecs = data.map(rec => {
                let today     = new Date();
                let closeDate = new Date(rec.CloseDate);
                let DaysRemaingToClose = Math.ceil((closeDate - today) / (24*60*60*1000));

                return{...rec, DaysRemaingToClose}
            })
        }
        if (error) {
            console.log('OpportunityCardParent::error ' + JSON.stringify(error));
        }
    }

    getUpdatedOppList() {
        console.log('OpportunityCardParent::getUpdatedOppList ');
        return refreshApex(this.wiredOpportunities);
        /*
        getOpportunities () 
        .then((result) => {
                console.log('OpportunityCardParent::getUpdatedOppList ' + JSON.stringify(result));
                this.lstOfOppRecs = result.map(rec => {
                let today     = new Date();
                let closeDate = new Date(rec.CloseDate);
                let DaysRemaingToClose = Math.ceil((closeDate - today) / (24*60*60*1000));

                return{...rec, DaysRemaingToClose}
            })
        })
        .catch((error) => {

        })
        */
    }
}