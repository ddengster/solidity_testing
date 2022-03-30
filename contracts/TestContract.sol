// SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.8.11;

contract TestContract {
  constructor() public {
  }

  function PureReturn() external pure returns(int) {
    return 2;
  }

  function CallWithArgs(int num, string memory mystr) external pure returns(string memory) {
    // let newstr = mystr.append(num);
    return "ret";
  }

  function CallWithArgsMultipleRet(int num, string memory mystr) external pure returns(string memory, int) {
    // let newstr = mystr.append(num);
    return ("ret2", 12);
  }

  event ValueSet(int val);
  int interactive = 0;
  function CallInteractive() external returns(int) {
    interactive = interactive + 3;

    // essential for grabbing return values; since instance.CallInteractive() will not return the ret value!
    emit ValueSet(interactive); 
    return interactive;
  }

  function GetInteractive() external view returns(int) {
    return interactive;
  }
}
