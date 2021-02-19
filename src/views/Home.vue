<template>
  <div id="home">
    <!-- <img alt="Vue logo" src="../assets/logo.png" /> -->
    <!-- <HelloWorld msg="Welcome to Your Vue.js App" /> -->
    <b-card class="w-100 todo-card shadow" style="margin-top: 100px;">
      <b-card-title class="row">
        <div class="flex-fill todo-card-title" contenteditable="true">
          {{ title }}
        </div>
        <b-button
          variant="link"
          v-b-tooltip.hover.bottom="{ variant: 'light' }"
          title="uncheck All"
          style="margin-top: -2px;padding-top: 0px;"
          @click="unCheckAll"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            fill="currentColor"
            class="bi bi-ui-checks-grid"
            viewBox="0 0 16 16"
          >
            <path
              d="M2 10h3a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1v-3a1 1 0 0 1 1-1zm9-9h3a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1h-3a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1zm0 9a1 1 0 0 0-1 1v3a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-3a1 1 0 0 0-1-1h-3zm0-10a2 2 0 0 0-2 2v3a2 2 0 0 0 2 2h3a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2h-3zM2 9a2 2 0 0 0-2 2v3a2 2 0 0 0 2 2h3a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H2zm7 2a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2h-3a2 2 0 0 1-2-2v-3zM0 2a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2zm5.354.854a.5.5 0 1 0-.708-.708L3 3.793l-.646-.647a.5.5 0 1 0-.708.708l1 1a.5.5 0 0 0 .708 0l2-2z"
            />
          </svg>
        </b-button>
        <b-button
          variant="link"
          style="margin-top: -2px;padding-top: 0px;"
          v-b-tooltip.hover.bottom="{ variant: 'light', boundaryPadding: 20 }"
          title="check All"
          @click="checkAll"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="currentColor"
            class="bi bi-check2-all"
            viewBox="0 0 16 16"
          >
            <path
              d="M12.354 4.354a.5.5 0 0 0-.708-.708L5 10.293 1.854 7.146a.5.5 0 1 0-.708.708l3.5 3.5a.5.5 0 0 0 .708 0l7-7zm-4.208 7l-.896-.897.707-.707.543.543 6.646-6.647a.5.5 0 0 1 .708.708l-7 7a.5.5 0 0 1-.708 0z"
            />
            <path
              d="M5.354 7.146l.896.897-.707.707-.897-.896a.5.5 0 1 1 .708-.708z"
            />
          </svg>
        </b-button>
        <b-button
          variant="link"
          style="margin-top: -2px;padding-top: 0px;"
          v-b-tooltip.hover.right="{ variant: 'light' }"
          title="Add new card"
          @click="addCard"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="currentColor"
            class="bi bi-plus float-right"
            viewBox="0 0 16 16"
          >
            <path
              d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"
            />
          </svg>
        </b-button>
      </b-card-title>

      <draggable handle=".drag-handle" v-bind="dragOptions">
        <!-- <b-card-text>Header and footers using props.</b-card-text> -->
        <Card
          v-for="(todo, index) in todoList"
          :key="index"
          :todo="todo"
          :cardIdx="index"
          @removeCard="removeCard(index)"
          @copyCard="copyCard(index)"
          @addCard="addCardIndex(index)"
          ref="cards"
        />
        <!-- <Card todoText="Something 2"/>
        <Card todoText="Something 3"/>
        <Card todoText=""/> -->
      </draggable>
    </b-card>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from "@/components/HelloWorld.vue";
import Card from "@/components/Card.vue";
import draggable from "vuedraggable";
// import { uuid } from "vue-uuid";

export default {
  name: "Home",
  components: {
    // HelloWorld
    Card,
    draggable
  },
  data: function() {
    return {
      title: "Hey there 👋",
      todoList: [
        {
          text:
            "Todo Online is an awesome free online to-do list app that helps you to create a to-do list with some extra features.",
          checked: false,
          priority: 0,
          imgList: []
        },
        {
          text: "Some Cool Features 💫 listed below",
          checked: false,
          priority: 0,
          imgList: []
        },
        {
          text:
            "You can sort the todo list by dragging the Card using the handle at left of card.",
          checked: false,
          priority: 0,
          imgList: [
            "data:image/png;base64,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"
          ]
        },

        {
          text:
            "You can set card Priorities by selecting it from the menu on the right side of the card",
          checked: true,
          priority: 0,
          imgList: []
        },
        { text: "High Priority Card", checked: true, priority: 1, imgList: [] },
        {
          text: "Medium Priority Card",
          checked: false,
          priority: 2,
          imgList: []
        },
        {
          text: "Normal Priority Card",
          checked: true,
          priority: 3,
          imgList: []
        },
        { text: "Low Priority Card", checked: false, priority: 4, imgList: [] },
        {
          text:
            "You can embed images by simply pasting the image using Ctrl+v or Cmd+v",
          checked: false,
          priority: 0,
          imgList: []
        },
        {
          text:
            "Can embed youtube videos in text https://www.youtube.com/watch?v=ScMzIvxBSi4 Place a video link in text with spaces",
          checked: true,
          priority: 0,
          imgList: []
        },
        {
          text:
            'You can add a new card by using ➕ button or Pressing "Enter" Key',
          checked: true,
          priority: 0,
          imgList: []
        },
        {
          text:
            'You can delete a card by using delete option in menu or Pressing "Delete" Key',
          checked: false,
          priority: 0,
          imgList: [
            "data:image/png;base64,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"
          ]
        },
        {
          text: "You can copy a card by using Copy option in menu",
          checked: true,
          priority: 0,
          imgList: [
            "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAM8AAACaCAIAAACBoItMAAAAA3NCSVQICAjb4U/gAAAWLElEQVR4Ae2dh3cUR7bG96/Yt7uO5GgwmJxzzshkDDbGeIElrAHzsEkyxiQDBrMYjG1AEghMRoAIQoEgIaEsBMoRSYhkYcAm7O77ROH76vSUWj3TMz1Bd86cUXV1dXXVd3+6t6qmp/tP/+WXCxS4e/fuvXv3fvnllwcPHjx8+PDRo0e//fbb77///uTJk6dPnz579uz58+f/fvH6zx8vF7TC46r8k8e1yCcaxLQpzci0KWUxm8m0KRVk2pSymM1k2pQKMm1KWcxmMm1KBZk2pSxmM5k2pYJMm1IWs5lMm1JBpk0pi9lMpk2pINOmlMVsJtOmVJBpU8piNpNpUyrItCllMZvJtCkVZNqUspjNZNqUCjJtSlnMZjJtSgWZNqUsZjOZNqWCTJtSFrOZTJtSQaZNKYvZTKZNqSDTppTFbCbTplSQaVPKYjaTaVMqyLQpZTGbybQpFWTalLKYzWTalAoybUpZzGYybUoFrabt9NlzBw4drqh4IFqjv6lssVdkMm1KM1lK288HD9Wq1whvQIbW6G8qm+stmUyb0lJMm1IWs5lMm1JBS2lDAIVXg0sTTdHfVDbXWzKZNqWlLKVN2QKfzGTalGZl2pSymM1k2pQKMm1KWcxmMm1KBZk2pSxmM5k2pYJMm1IWs5lMm1JBpk0pi9lMpk2pINOmlMVsJtOmVJBpU8piNpNpUyrItCllMZvJtCkVdCFtf9x0sSb+vXPnDoC7f/9+RUXFr7/+ittTPn782Pb2lHSHStym0u0yKflwbqbzaXO7ap7QAG+kjXRzLmFybU6jjdrKCSjg1bSRBWVQnJI2Sxu1rNqEuKlxDfm8ffs2gKMbPSOY4kbPtsFU3O4Z8VQOqZZJVK3JqIBTUEMlpmij1igTlqnmgSfyCto0uimNSJlOAc5x2qgdmoSmD7Qp/oNryGd5eTmAo4kC3cde497E3ezh4WQnZ5lEZBpNQmNQ2jQPnCO00ek1CU2j9VUTEvvq561btwAcBVOamWriqXh8ApiTsXOdJvoW0ZhPY1zaNMOc3bTRWSmhaaWmS0a0E3L70mdZWRmAI/cmHtMhlkJk4MTzOsCcjJ1zdTCiv8ZkGoOSoSnhMHD20Ubno4TcMrnRcierkk+o7JOfpaWlAI7cm1h4QzzVACdW4MCcjJ2LBKnKCrKlZAvKliVzU8Ix4Oygjc5ECWoQtVLTdFHSsZbxUdYoIGwEC2psJ2xKJiajU8KB5hmljc4hEtQIW87wP4S9DjSFD3G7AjAczEfYkXHJ3BoM7G2wIdo056BzU2tE+9BQ5NjbAi7vaQrAiMQcmZiMroHBrsZXT5umdjqraAdxxqjZpbuHFxbAaZgj02uQMN4X+2ij89miBuyMn5VLer4CMChoMwKc8b5UQ5uGYkGbBjUxhzJ+Si7pLQoIyyqB04BhsEd6tGlq1EENuwyej4t5kQIwq3OBq5I246ihQV6kIDfVLgUEbfh0ioczRJvwavikGIpzi3ZgWZJHbHbZz7sKw7i08iyAEwwQErJXqrZrdtAmoyZoQzuwGo4TV3saLuClCsC48iXHtsA5gTa5CqQFyKANpOMlo4aLGlDAS6XkZlerAIyruW5FMAAYBBUaVPQrVPs2uQpCTdCmQQ3fMeufgPd6uwLyZQQ0gBOBzhY4/c7aQZuAWkMbft+hfwLe6+0KKH/CAxiU7k2/swra7HJsTJu+vj6wFyZ2lntznDa0AO3AJTQ+IKiXdmHM+PfEnWXHTpjkui7QVVLydEH4Nnvdm1Ha5DCKs2LkKGjDNVuu6yfXrFEAd/Zs/k4bQZjOZ3TMFc2BZjY1l7nT0M2BYKpHm/78QDg2XANtpid8rF0KbNz0rQ5ktAvF7KpWvzBd5m47OVXOFXRqc5A2cmzOpe2jv88gyRo3a9G738AvvvwK18HqdIB27QoIrNuwKW36ZAK+rVlLq30bTEzuzUgw1VFeS5tyiqAMowjnaASuuNep3d5doK1rzz4IBHifD4/YsnVbp249ETti465WW5VB2nYHBs1b8L/V1ubJBegfUplwesvpRxU0V3A4mBqlzXbhA7SBeqfTNmDwMFkvxOuRo8a+07ZjtdMRg7TNX7jIN2iDxwFt/itWivAqNpEjq+eUNEysH0yNr7o5QpscRvH7Dqd0SVQC36ahDflZ2TkQcefuQFEmNTVt3MTJiLNN32419ePphUVFIl+mDeOJ9Rs3dezao37jZt169cUuUYYmcajwWvp1ZB47HtJv4FAUa9Wu49LlKxApRElP/kTjBVX4BGqCNjSY8p3bePoJj1gKsQ2mTqBNZ4pAtIF6C2iDdj1695/+jzlIFBffBGSTp0wFKympqaPHTezaow++rsUumbZl/iuAIx7MkJeXH7gnGDDt3bcfZRD6Bw/3mzXnE9wzAUSeCj0NC61e+3VObm54ZFT7zt1n/3M+inn4i6iyjDYRTKuizXYdpCoBq/RtVdEm1j5o0AazVVW1A/lK34Z6Jk6e4jd6PBKr1qwDbYgaovKSktI6DZrAP2GTaANSwAu+TZTB58JFi8Gr2BzuN5oi6bCRo94dU1mteB05erx2/cb4ad4fGR7612LabO9mIq4KweCqqlW3qoRznDYxaLOGtlFjJ4x/7330ATEU0VDuDAIlPBlyiLYrsXGwh7zmBIyQc+9F0Cfa8B+JOay8WADOUCz09Bm5fg9Mu4U2MXQTEwWLaKN1XZoiWEAbpsltO3SZ/+kiGB5xEM6sQZPm9IY3mjl7rkxb2Plw2APujcrUa/QWcjD+QzGiDcIhE8BRMSSQExi01wMJk5uERuKNHHxaMG4Tvk2mDRjQtBT/tHhphm5ya+W0Hb5NXM2GSErruhi04cYqcnUm08pIGnMlFrKeOBmKyuHbMFbLzsmR3yL2kW/DcokoL5dBGgKhBqINAoHClavWaIphBmayF64+HL3DG2fBpwW00b1z4GJgelrjdUkkFYttMJVMG8ZGgN0C2hD++g4cglGXYGX1uvXtO3VDk8iiuXl54AabRBtEgZcKCNxDZaCXCKPIAW2fzF8odo14d8yMWZWTD/GCfAWFhX9see5fQZtY8gBtWARBjutWQIg2GF2mDRYRbDjTt1lMG63uRkRe+G77jg5durds0wGrHsL4Yk6KmeP1Gzcw39y8ZStCISan2Eu0Ib3MfwWOCjlxqqi4GAM4rKpgrUTUgPksljzSrqUjQGCIhri8ddv3qAqTXETkdh27IsKKkh77iRVvAZztp+36kfle+DJtpCAw6tK99+Jl/iBMlgzkYcaABY4mzVpi4RdQir0ybfhvE+ttiJXwhUuWfUEMYaWjZev2eEdduIgDMZ/tP2gYBnktWrVDHAd28rk8M43vr0AVCUUJUIhdTm+zO2mD2eBOXRRJna4UV2heAQ1tAIAWeF0SSeWvrYg2sbSLppjvD9fgyQoI2vQXeJ02JwW/TJsn0+DqtnkKbRhos29ztbHdXj9MLJbcxJxUjqS0CGKFb2Pa3I6CBQ1g2iwQmU/xUgGmjVGwTgGmzTqt+UxMGzNgnQJMm3Va85mYNmbAOgU8i7Zbd+7z24cVYNqYb+sUYNqs09qHnZbBrjFtTJt1CjBt1mlt0AH4cDGmjWmzTgGmzTqtPdZp/XPep3/+yyv0xqaLmsq01VDasvMKt/+wc5n/lwALnGGTCKtdtwHSS/2/RAE5nwo4nGDaaiht+HUj3kAK6IA2Agh4EW0oMHXadNplPuHLtJXdvof/zn4DBkO+19+s07Z9p8+XLM/MyTevmg/UIBOG0AmJKJIKBNFHIs9Z/fVl2j74cNr//PXV9z+ctitwb/D+g4uX+tep17B1u47XbmQ5Sz7vrUemTacXBovp1CDv8lnavvv+Ryi1Zet2ubfRsfFv1Ko7feZsObNmpg1iZLCYQQ19lraOnbv16tPfVoWIC5cLiktFfujZ8/0GDnntjdpAcNCQ4WERF0T+2q831q3f6Ojxkx06dX3ltTdbvNPmh50B2LV42ReIOIU3y6ja9d98i8OdO5Smyl2aMIiRwWIGm+qbtMH8kOnLr9boqBB7NRGgTJj0QeTF6IioS6PHTqhVp35qegYO2fDNt3995fUhw/0SktNyC4oXLPzsL3977cLlK4nJaQjNiMtULWCd9P6HtOlFCYMYGSxmsOO+SVtMXAJk+mlXoI4KuIWH7Kgwe4AbW/EC0I2btuDwYyGnxOE3y24DxEWLl2Fz6HA/v1FjRT7Gf6Dw8LETOmfx2F0GMTJYzGA3fZO2q4kpkGnHT7t1VIBbQvSUC7Tr0BmuDjmCNng12tutR++x49/D5u6gvXB71zNzkN605bu3mrcsLb9LxbwoYRAjg8UMdtw3acPIDF4HwywdFTp37TFuwiS5QJ9+A4ePHIUcQRsWUGgv0BS7ikvLGzRqiuEadg0eOuKzFw6PinlRwiBGBosZ7Lhv0obOAx34KlvHE7Bn374Dh1Gg/6ChGt+GBTncJxW7BG1ZuQUkYpduPcdPnCw2cfdTVH4jKxdOLjY+icoYTABitAqfMs0Gj3ViMYMYGSxmsGE+SxtCHpQS38yQFhejY7HkJlZA5n26SB63ITiCntXrNqCwoO3AoaPiQExCsTi8ZPkKsYllFMwVsHrXt/8gqtlgApwVlZTlROXnpRfDTboROIMYGSxmsPs+Sxv6P3PWXIiFQT0GcEHBPy/8bAnwglvKyS/CXoztMCfF2i/owbR0hN9ohEh4LOwCbSAP0fNk6Fl4r6kfz0BcxsyDNEUlf3v1jX9t20E5RhJgq/BmafySxMShCbE9r6Sfz3IjcAYxMljMSPdRxpdpQ/d2BuwZOHhY/YZNsKLWqUv3VWvXy6tlp8+FAykw92bteqDtUkycUE3Qhr1du/fCRLVlq7YBQcGyoHCBqFBQK+frp0tu3cnIzA3vcflpxbPc7YUXF8flgT43TTLebtk65NQZ/QajAEa3+mXs2uvjtNmlBRUGbXBmtKlJwEX16jsAD13Q5Otv4qjikluJl9PDR1Y++qjwWNm5BdEYGgJB/QNdtHfvvgMgCa5L5w0iUcyJDWDaFNeAVEUb/CJGfjNmzYVjS0y5ZpcZRBiNCU06Py0FtBWcLj8x73JGVq67aLOr8c4qzLTZQVt41KVXX6/Vum0HfKllrwFAG9Zlog4mhC1Kr6Qt6s7heZev3cjEpAHAiVmqvXV6XXmmTUGbK6wInjBKO7c37vzqzMpIGnsvaPqlk5uvRgSkJl/OSU8oENgBSlec3UPqZNpcSBvQAWRwXfjuC9NPfHt7KiAu7F+VT/YoTqs4vvJGwtGSs5uy9sxJDpqd9PMXCRmZ+RjbuWveYAGRTJuraANq4Cwrq/j4jrTgtUmng9NSUjIO/RATtkt1r/H//DciqGDrzPij21IQcH0VOKbNVbSJ0LltWcKpwPzkS7ePfJ+zeWHcjnWXIo8Ww7cpX78/fr5jeVrUuevwcD4ZUpk2V9EGx4Yp56qFcSWFL5/RceZIkf/cq7FRt5SoiczQQ4X7AxPyi0p80r0xba6kLTtv/75o/6UJ2VmVz6XEM93Cw0pzsl8+o1LJXMixoqCgq1g3ZtrEk+KVKiGz+qeq6dzBXtzl2YKBqmWnAC5wUbgeM/hA5GcrEvIKHlYlnJwfsD8v+BDT9m+BGj5lceQ006Z1kwimuEguPjFl5/4o/++uP39epXak44aArMOh8TiKfZvLfRuJ7hsJ6IXHZOHZANnZ2Uu+jz8Xf7vafi3acf1KUhYeJKDzb11tJR5bwLPGbR4rk8MNAzR47sSdO3fCY1Knb0+7//CpTlXlFU8+3JJYUFCIJ2oybVBARwQnRFIdS3jvLkiGx74WFRVtDkmYuz+j4vH/PxFV06nDieX+BxLLysoAqI7QmqO8aJN9mxXGQjzFE39zcnLWhCRMO5RR+qDy0c22rxlHMkNi0vBgYJS33esDOUybFUaEo4K7AkZZWVkbz8RPOVH5VanmlXP/t5H7U/D8ZzhCn3Rs6C/TpjG6qzYFcFjoSb9+vfvBlMfPKh8pLr8OZt+dH5pUWlqKx14zbVBAvGSJ5DSP22Q1FGnIh4e/FhYWdg5J/fWZNlYGZN9eEJ6C+QRWJRUH+0QW+zZLzYh4iklAr3Opy9NLTpdVFDx68vzFAubdJ882Z9+aczENzs9XB20Q2rNos2yh310nwnovfpR/PDpuQVj08LCrHSJSGkam14tMbxGR2i08eUd0oq9+ZyUE9yzaLPUz7jgZginW0iA64mlGRkZaWlpycnJSUlJKSkpmZmZ5ebmvrrQJsZk2q6EDcBiZYQCH7xgwS4UBhA2wCdTw5GGrG2Th+URP3f9c+Zr27GUwB7AwRKMXNpFpoendcCqmzQ2i19hTMm011vRu6DjT5gbRa+wpmbYaa3o3dJxpc4PoNfaUTFuNNb0bOs60uUH0GntKpq3Gmt4NHWfa3CB6jT0l01ZjTe+GjjNtjoj+0d9n1KrXiN4t23QYN3FybFzlbQCVr5at22/eslW5SyfTsaN0KnT7LqbNEROAtq49+0THXBHvY8dDQFudBk0uR8coqztw6HBq2jXlLp1M+ah32nYsKq7yBiI6lXjULqbNEXOAtgGDh8lH4vLu9p27I1/ORNqxC3E1R928WQI/yrTJ2tagK8VtaYMQ70/5aNDQEUhcv3EDcIRHRvXpP0jkyDERvzyYOXvu263a1m/crO/AIUeOHhci/rQroHX7TmHnw1u16+i/YiUyxVFwnxSycd5RYyfgoQ7iEPH58fR/jHh3jJzjsWn2bY6YRklbr74DcT98VJedkwM+hvuNPnj4CMhDDtGGK8VRDJDFXInNyc1dv3ETSp4LO48ygXuCmzR/Z9IHU6MuXCwoLKSj4OdCTpxCsbRr6Q8fPkSdCNllt17eKOnR48eN3moRtHcfynv+i2lzxEaCNro0rbSsbOWqNQDi5KnTqC4/vwDpr1avpaqJtjNnw7ArPj6Bdg0e7id8VfD+n7ErPCKSdtFREZEXsEtEUlyG2axlm+07fhTFAGLDpm/jSkw6ypMTTJsj1gFtML/8RmTcE/zSwQjaTpwMpaqJGzizug2byhfofr50OWYAKClogz1sj5Jpw14c0n/Qy1EjgvKsufPoEA9PMG2OGAi09ejdPyU1VbwLi4pkgARtFy9dpqqJNgzIWrRqR/lIrP16Q4MmzZEQtMFf0l46SkMbQipAR4zGleUIvhcuXqJDPDzBtDliIOW4jSrSoW3DN5vh2+Qrwj9fsgzTAhxrnDYUxuQDmJ4+e65Dl+4y6NQGz0wwbY7YxWHaMCGAW0pITKKzIiZ+MPVjbFZLGzwoHRUYtLd7736z5nyybv1GyvT8BNPmiI0cpg0TzD4DBuNhpwAuLy9/9dqva9dvLNaEdWhLTEoGo7sCAjMyXt5ABNOCxs1a1Gv0FvyoIx1w0zFMmyPCO0wbToYJLIb2mFdivW3wsJGYpYoW6NCGwRwW87DSMXnKVGouPOK7Y8bTplckmDavMJO2kTAb5gf4xky7w7O3mTbPto9N6/DD26TkFL/R4zHgkyewNgU9MYNp80Sr6LTpx527EYJHj5vojV+bMm06luVdTlaAaXOyoFydjgJOpO3/AMu62zH8iZpBAAAAAElFTkSuQmCC"
          ]
        }
      ]
    };
  },
  methods: {
    addCard() {
      this.todoList.push({
        text: "",
        checked: false,
        priority: 0,
        imgList: []
      });
      this.$nextTick(() => {
        this.$refs.cards[this.todoList.length - 1].todoInput.focus();
      });
    },
    removeCard(index) {
      this.$delete(this.todoList, index);
    },
    copyCard(index) {
      this.todoList.splice(
        index + 1,
        0,
        JSON.parse(JSON.stringify(this.todoList[index]))
      );
    },
    addCardIndex(index) {
      this.todoList.splice(index + 1, 0, {
        text: "",
        checked: false,
        priority: 0,
        imgList: []
      });
      this.$nextTick(() => {
        this.$refs.cards[index + 1].todoInput.focus();
      });
    },
    checkAll() {
      this.todoList.forEach(ele => {
        ele.checked = true;
      });
    },
    unCheckAll() {
      this.todoList.forEach(ele => {
        ele.checked = false;
      });
    }
  },
  computed: {
    dragOptions() {
      return {
        animation: 200,
        group: "description",
        disabled: false,
        ghostClass: "blue-background-class"
      };
    }
  }
};
</script>

<style lang="scss">
@import "~bootstrap/scss/_functions.scss";
@import "~bootstrap/scss/_variables.scss";
@import "~bootstrap/scss/mixins/_breakpoints.scss";
.todo-card {
  margin-bottom: 20px;
  // margin-right: calc(10%);
  margin-right: auto;
  margin-left: auto;
  border: 0;
  max-width: 1100px;
  min-width: 404px;
  border-radius: 15px;
  text-align: start;
}
.todo-card-title {
  font-size: 150%;
  display: inline-block;
  vertical-align: middle;
}
.todo-card-title:focus {
  outline: 0px solid transparent;
}
.card-body {
  margin: 20px;
}

.todo-card .btn-link {
  color: initial;
  box-shadow: none;
}
.tooltip-inner {
  /* height: 50px !important; */
  /* width: 100px !important; */
  padding: 10px;
}
@include media-breakpoint-down(xl) {
  .todo-card {
    margin-right: auto;
  }
}
</style>
