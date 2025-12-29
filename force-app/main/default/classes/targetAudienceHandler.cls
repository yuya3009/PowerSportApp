public with sharing class targetAudienceHandler {
	@AuraEnabled
	public static void createTargetAudience(List<TargetAudience__c> targetAudience) {
		if (targetAudience != null) {
			insert targetAudience;
		}
	}
}