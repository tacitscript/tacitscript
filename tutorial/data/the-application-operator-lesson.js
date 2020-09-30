export default `/*ts
    application               2.+3                     NB: In contrast to other operators, the dot (.) operator has lowest precedence
    doubleThenAddOne          *2.+1                    Left-associative precedence would require *2.(+1) here, without the new precedence rule
    pipeline                  doubleThenAddOne4
    dot                       .
    subtractTwoThenHalf       -2dot(/2)                The precendence rule does not apply to aliases, so parentheses are required here
    applyToPipeline           8.subtractTwoThenHalf
*/`;