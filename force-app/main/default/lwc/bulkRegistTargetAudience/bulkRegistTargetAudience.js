import { LightningElement } from 'lwc';
import { displayToast } from 'c/util';

export default class BulkRegistTargetAudience extends LightningElement {
  // デフォルトの行数
  rowIndex = 3;
  // 項目の配列
  fieldRows = ['Name', 'AcquaintanceRoute__c', 'LineInformation__c', 'FirstConversationDate__c'];
  // 項目ごとに列を定義
  rows = [
    { id: 1, fields: this.fieldRows },
    { id: 2, fields: this.fieldRows },
    { id: 3, fields: this.fieldRows }
  ];
  // insertするためのキーと値をマッピングした列
  targetRow = {};
  // 入力された値が入っている配列
  targetPersons = [];

  /**
   * Idをキーに追加・削除するのでIdの数を動的に変化させる
   */
  addRow() {
    this.rowIndex++;
    this.rows = [
      ...this.rows,
      { id: this.rowIndex, fields: this.fieldRows }
    ];
  }

  handleTargetAudience(event) {
    let rowId = event.target.dataset.rowId;
    let fieldName = event.target.fieldName;
    let value = event.detail.value;
    if (!this.targetRows[rowId]) {
      this.targetRows[rowId] = {};
    }
    this.targetRows[rowId][fieldName] = value;
  }

  handleCreate() {
    /**
     * 入力項目判定
     * handleTargetAudienceで作られた配列から判定する
     */
    this.targetRow = JSON.stringify(this.targetRow);
    console.log('入力列', this.targetRow);
    this.targetRow.forEach((row) => {
      if (row.Name = null) {
        displayToast('', '対象者名が空欄になっています', 'error');
      }
// ToDo 項目値があるか判定
    });
  }
}