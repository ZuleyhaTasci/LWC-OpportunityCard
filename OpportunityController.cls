public with sharing class OpportunityController {
    
    @AuraEnabled(cacheable=true)
    public static List<Opportunity> getOpportunities() {
        return [SELECT Id, Name, StageName, CloseDate, Amount, Account.Name, Type
                FROM Opportunity
                WHERE CreatedDate = Last_N_Days:60
                AND StageName NOT IN ('Closed Won', 'Closed Lost')
                AND CloseDate >= Today AND Id = '0065e000002gDrAAAU'
                ORDER BY Amount DESC
                LIMIT 5];
    }
}