<template>
    <h2>NicePay 결제 API</h2>

    <button @click="methods.goOrder">주문/결제</button>
    <button @click="methods.goOrderList">주문조회</button>
    <button @click="methods.goCancel">결제취소</button>

    <div v-show="state.show.orderShow">
        <form name="payForm" method="post">
            <table>
            <tr>
                <th><span>상품명</span></th>
                <td><input type="text" name="GoodsName" v-model="state.orderParams.goodsName"></td>
            </tr>
            <tr>
                <th><span>상품금액</span></th>
                <td><input type="text" name="Amt" v-model="state.orderParams.amt"></td>
            </tr>				
            <tr>
                <th><span>상점 아이디</span></th>
                <td><input type="text" name="MID" v-model="state.orderParams.mid"></td>
            </tr>	
            <tr>
                <th><span>상품 주문번호</span></th>
                <td><input type="text" name="Moid" v-model="state.orderParams.moid"></td>
            </tr> 
            <tr>
                <th><span>구매자명</span></th>
                <td><input type="text" name="BuyerName" v-model="state.orderParams.buyerName"></td>
            </tr>	 
            <tr>
                <th>구매자명 이메일</th>
                <td><input type="text" name="BuyerEmail" v-model="state.orderParams.buyerEmail"></td>
            </tr>			
            <tr>
                <th><span>구매자 연락처</span></th>
                <td><input type="text" name="BuyerTel" v-model="state.orderParams.buyerTel"></td>
            </tr>
            <tr>
                <th>SignData</th>
                <td>{{ state.orderParams.signData }}</td>
            </tr>		
                            
            <!-- 옵션 --> 
            <input type="hidden" name="GoodsCl" v-model="state.orderParams.goodsCl"/>						<!-- 상품구분(실물(1),컨텐츠(0)) -->
            <input type="hidden" name="TransType" v-model="state.orderParams.transType"/>					<!-- 일반(0)/에스크로(1) --> 
            <input type="hidden" name="CharSet" v-model="state.orderParams.charSet"/>					<!-- 응답 파라미터 인코딩 방식 -->
                    
            <!-- 변경 불가능 -->
            <input type="hidden" name="EdiDate" v-model="state.orderParams.ediDate"/>			<!-- 전문 생성일시 -->
            <input type="hidden" name="SignData" v-model="state.orderParams.signData"/>	<!-- 해쉬값 -->
            </table>
            <br>
            <button @click="methods.nicepayStart()">결제 요청</button>
        </form>
    </div>

    <order-result v-show="state.show.orderResultShow" :orderResult="state.resultParams" />
    
    <div v-show="state.show.cancelShow">
        <input type="text" v-model="state.cancelParams.tid" placeholder="거래번호"><br>
        <input type="text" v-model="state.cancelParams.moid" placeholder="주문번호"><br>
        <input type="text" v-model="state.cancelParams.cancelAmt" placeholder="환불금액"><br>
        <input type="text" v-model="state.cancelParams.refundAcctNo" placeholder="환불계좌번호"><br>
        <input type="text" v-model="state.cancelParams.refundBankCd" placeholder="은행코드"> <span>004:KB국민, 011:농협</span><br>
        <input type="text" v-model="state.cancelParams.refundAcctNm" placeholder="환불계좌주명"><br>
        <button @click="methods.cancel()">확인</button>
    </div>

    <cancel-result v-if="state.show.cancelResultShow" :resultParams="state.cancelResultParams" />
    <order-list v-if="state.show.orderListShow" :orderList="state.orderList.list" />
</template>

<script setup>
import { reactive, onMounted } from 'vue'
import api from '@/api/service.js'
import moment from 'moment'
import orderResult from './OrderResult.vue'
import cancelResult from './CancelResult.vue'
import orderList from './OrderList.vue'

let goPay = null
let deleteLayer = null

onMounted(() => {
    const script = document.createElement('script')
    script.src = 'https://web.nicepay.co.kr/v3/webstd/js/nicepay-3.0.js'
    script.async = true
    script.onload = () => {
        goPay = window.goPay
        deleteLayer = window.deleteLayer
    }
    document.head.appendChild(script)
})

const state = reactive({
    orderParams: {
        goodsName: '',
        amt: '',
        mid: '',
        moid: '',
        buyerName: '',
        buyerEmail: '',
        buyerTel: '',
        goodsCl: '',
        transType: '',
        charSet: '',
        ediDate: '',
        signData: '',
    },
    resultParams: {
        resultCode: '',
        resultMsg: '',
        payMethod: '',
        goodsName: '',
        amt: '',
        tid: '',
        signature: '',
        buyerName: '',
        buyerEmail: '',
        vbankBankName: '',
        vbankBankCode: '',
        vbankNum: '',
        vbankExpDate: '',
        vbankExpTime: '',
        // 커스텀 파라미터(vbankExpDate + vbankExpTime 연월일시 format적용)
        vbankExp: '',
    },
    cancelParams: {
        tid: '',
        moid: '',
        cancelAmt: '',
        refundAcctNo: '',   //환불계좌번호(숫자만)
        refundBankCd: '',   //환불계좌코드(은행코드 참고)
        refundAcctNm: '',   //환불계좌주명(euc-kr)
    },
    cancelResultParams: {
        resultCode: '',
        resultMsg: '',
        cancelAmt: '',
        cancelDate: '',
        cancelTime: '',
    },
    orderList: {
        list: [],
    },
    newFormElements: {

    },
    show: {
        orderShow: false,
        orderResultShow: false,
        cancelShow: false,
        cancelResultShow: false,
        orderListShow: false,
    },
})

const methods = {
    goOrder() {
        api.post('/v1/external/order', state.orderParams).then((res) => {
            state.orderParams = res.data
            for(let key in state.show) {
                state.show[key] = false
            }
            state.show.orderShow = true
        })
    },
    goCancel() {
        for(let key in state.show) {
            state.show[key] = false
        }
        state.show.cancelShow = true
    },
    cancel() {
        api.post('/v1/external/cancel', state.cancelParams).then((res) => {
            state.cancelResultParams = res.data
            
            for(let key in state.show) {
                state.show[key] = false
            }
            state.show.cancelResultShow = true
        })
    },
    async goOrderList() {
        await api.get('/v1/external/getOrderList').then((res) => {
            state.orderList.list = res.data
        })
        for(let key in state.show) {
            state.show[key] = false
        }
        state.show.orderListShow = true
    },
    nicepayStart() {
        if (typeof goPay === 'function') {
            goPay(document.payForm);
        } else {
            console.error('goPay is not available.');
        }
    },
}

window.nicepaySubmit = function() {
  /*
    외부 js 프로세스를 통해 payForm에 properties가 추가되었음
    JSP샘플에서는 payForm을 서버로 즉시 submit하고있음
    vue에서는 변경된 payForm properties를 state.requestParam에 (재)정의하는 과정이 필요
  */
  const formElements = document.payForm.elements;
  for (let i = 0; i < formElements.length; i++) {
    const element = formElements[i];
    state.newFormElements[element.name] = element.value;
  }
  
  api.post('/v1/external/callback', state.newFormElements).then((res) => {
    console.log(res.data)
    state.resultParams = res.data
    // 가상계좌만료일
    state.resultParams.vbankExp = moment(state.resultParams.vbankExpDate+state.resultParams.vbankExpTime, 'YYYYMMDDHHmmss').format('YYYY-MM-DD HH:mm:ss')
    // 가격
    state.resultParams.amt = parseInt(state.resultParams.amt, 10).toString()

    // loading 이미지 레이어 삭제
    if (typeof deleteLayer === 'function') {
        deleteLayer();
    } else {
        console.error('deleteLayer is not available.');
    }

    for(let key in state.show) {
        state.show[key] = false
    }
    state.show.orderResultShow = true
  })
}

</script>

<style scoped>
    button {
        margin: 4px;
        margin-bottom: 25px;
    }
</style>