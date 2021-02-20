import { expect } from "chai";
import { shallowMount } from "@vue/test-utils";
import HelloWorld from "@/components/HelloWorld.vue";
import Card from "@/components/Card.vue";

describe("HelloWorld.vue", () => {
  it("renders props.msg when passed", () => {
    const msg = "new message";
    const wrapper = shallowMount(HelloWorld, {
      propsData: { msg }
    });
    expect(wrapper.text()).to.include(msg);
  });
});

describe("Card.vue", () => {
  it("Loads props.todo when passed", () => {
    const text = "";
    const priority = 0;
    const checked = false;
    const ImgList: Array<string | ArrayBuffer> = [];
    const wrapper = shallowMount(Card, {
      propsData: {
        todo: {
          text: text,
          checked: checked,
          priority: priority,
          imgList: ImgList
        }
      }
    });
    // expect(wrapper.text()).to.include({
    //   text: text,
    //   checked: checked,
    //   priority: priority,
    //   imgList: ImgList
    // });
  });
});
