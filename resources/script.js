"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.sum = sum;

function sum(a, b) {
  return a + b;
} // const grid = document.querySelector('#grid')
// const blockWidth = 100
// const blockHeight = 20
// class Block {
//     constructor(xAxis, yAxis) {
//         this.bottomLeft = [xAxis, yAxis]
//         this.bottomRight = [xAxis + blockHeight, yAxis]
//         this.topLeft = [xAxis, yAxis + blockWidth]
//         this.topRight = [xAxis + blockHeight, yAxis + blockWidth]
//     }
// }
// const blocks = [
//     new Block(10,270)
// ]
// console.log
// function addBlocks() {
//     for (let i = 0; i < blocks.length; i++) {
//         const block = document.createElement('div')
//         block.classList.add('block')
//         block.style.left = blocks[i].bottomLeft[0] + 'px'
//         block.style.bottom = block[i].bottomLeft[1] = "px"
//         grid.appendChild(block)
//     }
// }
// addBlocks()