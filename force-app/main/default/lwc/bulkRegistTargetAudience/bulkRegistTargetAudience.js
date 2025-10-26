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

  handleCreate() {
    /**
     * 入力項目判定
     * 仕様として、入力されていない行も存在するので、入力されている項目が1~3個の場合はエラーを表示する
     * 0または4の場合はinsertする
     */
    console.log("列項目", this.rows);
    this.rows.forEach((row) => {
// ToDo 項目値があるか判定
    });
  }
}