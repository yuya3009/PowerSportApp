@isTest
private with sharing class targetAudienceHandlerTest {
  @TestSetup
	static void createTargetAudienceRecords() {
		List<TargetAudience__c> targetAudiences = new List<TargetAudience__c>();
		// 一人目の対象者
		TargetAudience__c atFirstTargetAudience = new TargetAudience__c();
		atFirstTargetAudience.Name = '田中健太';
		atFirstTargetAudience.AcquaintanceRoute__c = 'カレー1on1';
		atFirstTargetAudience.LineInformation__c = 'a8765bm';
		atFirstTargetAudience.FirstConversationDate__c = Date.today();
		// 二人目の対象者
		TargetAudience__c atSecondTargetAudience = new TargetAudience__c();
		atSecondTargetAudience.Name = '浜中一郎';
		atSecondTargetAudience.AcquaintanceRoute__c = 'SNS';
		atSecondTargetAudience.LineInformation__c = 'ichiro.hama';
		atSecondTargetAudience.FirstConversationDate__c = Date.today();
		targetAudiences.add(atFirstTargetAudience);
		targetAudiences.add(atSecondTargetAudience);

		insert targetAudiences;
	}

	// 正常系のテスト(2件レコードがあるかの確認)
	@isTest
	static void Test1_createTargetAudience() {
		
		Test.startTest();
		// TestSetupで作成されたデータを取得
    List<TargetAudience__c> targetAudiences =
		[SELECT Id, Name, AcquaintanceRoute__c, LineInformation__c, FirstConversationDate__c
		 FROM TargetAudience__c];
		Test.stopTest();

		Integer testActualTargetAudienceRecordSize = 2;
		Assert.areEqual(testActualTargetAudienceRecordSize, targetAudiences.size());
	}

	// 異常系のテスト(必須項目がnullの時に0件であることを確認する)
	@isTest
	static void Test2_createTargetAudience() {
		// TestSetupで作成されたデータを取得
    List<TargetAudience__c> targetAudiences =
		[SELECT Id, Name, AcquaintanceRoute__c, LineInformation__c, FirstConversationDate__c
		 FROM TargetAudience__c];
		
		Test.startTest();
		delete targetAudiences;
		Test.stopTest();

		Integer testActualTargetAudienceRecordSize = 0;
		Integer targetAudienceCount = [SELECT COUNT() FROM TargetAudience__c];
		Assert.areEqual(testActualTargetAudienceRecordSize, targetAudienceCount);
	}
}