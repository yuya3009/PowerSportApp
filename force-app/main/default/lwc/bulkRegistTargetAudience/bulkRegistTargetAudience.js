import { LightningElement } from 'lwc';

export default class BulkRegistTargetAudience extends LightningElement {
  // デフォルトの行数
  rowIndex = 3;
  // 項目ごとに列を定義
  rows = [
    { id: 1, fields: ['Name', 'AcquaintanceRoute__c', 'LineInformation__c', 'FirstConversationDate__c'] },
    { id: 2, fields: ['Name', 'AcquaintanceRoute__c', 'LineInformation__c', 'FirstConversationDate__c'] },
    { id: 3, fields: ['Name', 'AcquaintanceRoute__c', 'LineInformation__c', 'FirstConversationDate__c'] }
  ];

  /**
   * Idをキーに追加・削除するのでIdの数を動的に変化させる
   */
  addRow() {
    this.rowIndex++;
    this.rows = [
      ...this.rows,
      { id: this.rowIndex, fields: ['Name', 'AcquaintanceRoute__c', 'LineInformation__c', 'FirstConversationDate__c'] }
    ];
  }
}