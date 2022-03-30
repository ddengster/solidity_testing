
const TestContract = artifacts.require("TestContract");

contract("TestContract", (accounts)=> {

  let [alice, bob] = accounts;
  let contractInstance;
  beforeEach(async () => {
    contractInstance = await TestContract.new();
  });
  
  it("mytest", async () => {
    const result = await contractInstance.PureReturn();
    
    console.log(result); // BigNum type
    let num = result.toString(); // BigNum type
    assert.equal(num, 2);
    assert.equal(num, "2");

    console.log("===");
    const result2 = await contractInstance.CallWithArgs(1, "asr");
    console.log(result2);
    assert.equal(result2, "ret");

    console.log("===");
    const result3 = await contractInstance.CallWithArgsMultipleRet(1, "asr");
    console.log(result3);
    console.log(result3[0]);  //"ret2"
    console.log(result3[1]);  //12

    const {0: strValue, 1: intValue} = result3;
    assert.equal(strValue, "ret2");
    assert.equal(intValue, 12);

    // make and commit a transaction via the CallInteractive function
    // note that you need an event emitted in the solidity code for the logs[] array to populate
    const result4 = await contractInstance.CallInteractive();
    console.log(result4);
    assert.equal(result4.logs[0].args.val, 3);

    // make a 'call' without actually commiting the transaction
    const result4a = await contractInstance.CallInteractive.call();
    console.log(result4a);
    assert.equal(result4a, 6);

    const result5 = await contractInstance.CallInteractive();
    assert.equal(result5.logs[0].args.val, 6);

    //get the value stored
    const result5a = await contractInstance.GetInteractive.call();
    assert.equal(result5a, 6);
  });
});