import { LightningElement } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

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
    // 既存の列の値を取得（なければ空オブジェクト）
    let inputRow = this.targetRow[rowId] || {};
    // 新しい値でマージ
    let updatedRow = {
      ...inputRow,
      [fieldName]: value
    };
    // targetRow自体も新しいオブジェクトにして再代入（リアクティブにするため）
    this.targetRow = {
      ...this.targetRow,
      [rowId]: updatedRow
    };
  }

  handleCreate() {
    /**
     * 入力項目判定
     * handleTargetAudienceで作られた配列から判定する
     */
    let fieldName_name = 'Name';
    let fieldName_AcquaintanceRoute__c = 'AcquaintanceRoute__c';
    let fieldName_LineInformation__c = 'LineInformation__c';
    let fieldName_FirstConversationDate__c = 'FirstConversationDate__c';
    let failureOfToast = 'error';
    // this.targetRow = JSON.stringify(this.targetRow);
    Object.keys(this.targetRow).forEach(rowNumber => {
      // 各項目の値をチェック
      let row = this.targetRow[rowNumber];
      // Nameバリデーション
      if (!(fieldName_name in row)) {
        this.dispatchEvent(
          new ShowToastEvent({
            title: '',
            message: '対象者名が空欄になっています',
            variant: failureOfToast
          })
        );
        return;
      }
      // AcquaintanceRoute__cバリデーション
      if (!(fieldName_AcquaintanceRoute__c in row)) {
        this.dispatchEvent(
          new ShowToastEvent({
            title: '',
            message: '知り合い経路が空欄になっています',
            variant: failureOfToast
          })
        );
        return;
      }
      // LineInformation__cバリデーション
      if (!(fieldName_LineInformation__c in row)) {
        this.dispatchEvent(
          new ShowToastEvent({
            title: '',
            message: 'LINE情報が空欄になっています',
            variant: failureOfToast
          })
        );
        return;
      }
      // FirstConversationDate__cバリデーション
      if (!(fieldName_FirstConversationDate__c in row)) {
        this.dispatchEvent(
          new ShowToastEvent({
            title: '',
            message: '初回会話日が空欄になっています',
            variant: failureOfToast
          })
        );
        return;
      }
    });
  }
}