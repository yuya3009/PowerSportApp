import { LightningElement } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import registTargetAudience from '@salesforce/apex/targetAudienceHandler.createTargetAudience';

export default class BulkRegistTargetAudience extends LightningElement {
  // デフォルトの行数
  rowIndex = 3;
  // 項目の配列
  fieldRows = ['Name', 'AcquaintanceRoute__c', 'LineInformation__c', 'FirstConversationDate__c', 	'edgeAccuracy__c'];
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
     * キー(項目API名)がなかったら、エラーを表示する
     */
    let fieldName_name = 'Name';
    let fieldName_AcquaintanceRoute__c = 'AcquaintanceRoute__c';
    let fieldName_LineInformation__c = 'LineInformation__c';
    let fieldName_FirstConversationDate__c = 'FirstConversationDate__c';
    let failureOfToast = 'error';
    // Apexに渡す対象者レコード
    let targetAudience = [];
    // 何も入力されていなかったら、エラーメッセージを表示
    if (Object.keys(this.targetRow).length === 0) {
      this.dispatchEvent(
        new ShowToastEvent({
          title: '',
          message: '1行以上入力してから登録してください',
          variant: failureOfToast
        })
      );
      return;
    }
    Object.values(this.targetRow).forEach(row => {
      /**
       * 入信確度以外の項目の値をチェック
       * 入信確度は設定で必須項目になっていないため、入信確度は必須にしない。
       */
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
      targetAudience.push(row);
    });
console.log('targetAudience :', targetAudience);
console.log('文字列化したtargetAudience', JSON.stringify(targetAudience));
    registTargetAudience({ targetAudience: targetAudience })
    .then((result) => {
      console.log('登録成功結果', result);
      this.dispatchEvent(
        new ShowToastEvent({
          title: '',
          message: '連絡先情報を登録しました',
          variant: 'success'
        })
      );
    })
    .catch((error) => {
      console.log('登録失敗結果', error);
      this.dispatchEvent(
        new ShowToastEvent({
          title: '',
          message: '連絡先情報の登録に失敗しました。管理者に連絡してください。',
          variant: failureOfToast
        })
      );
    });
  }
}