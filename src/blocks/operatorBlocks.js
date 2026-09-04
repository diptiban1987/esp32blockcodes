// techyblocks operator blocks — arithmetic, logic, strings, math functions
export const operatorBlocks = {};

// ── Math Operators ──
operatorBlocks['operator_add'] = {
  init: function() {
    this.jsonInit({
      type: 'operator_add',
      message0: '%1 + %2',
      args0: [
        { type: 'input_value', name: 'NUM1' },
        { type: 'input_value', name: 'NUM2' }
      ],
      output: 'Number',
      colour: '#59C059',
      tooltip: 'Add two numbers'
    });
  }
};

operatorBlocks['operator_subtract'] = {
  init: function() {
    this.jsonInit({
      type: 'operator_subtract',
      message0: '%1 - %2',
      args0: [
        { type: 'input_value', name: 'NUM1' },
        { type: 'input_value', name: 'NUM2' }
      ],
      output: 'Number',
      colour: '#59C059',
      tooltip: 'Subtract two numbers'
    });
  }
};

operatorBlocks['operator_multiply'] = {
  init: function() {
    this.jsonInit({
      type: 'operator_multiply',
      message0: '%1 * %2',
      args0: [
        { type: 'input_value', name: 'NUM1' },
        { type: 'input_value', name: 'NUM2' }
      ],
      output: 'Number',
      colour: '#59C059',
      tooltip: 'Multiply two numbers'
    });
  }
};

operatorBlocks['operator_divide'] = {
  init: function() {
    this.jsonInit({
      type: 'operator_divide',
      message0: '%1 / %2',
      args0: [
        { type: 'input_value', name: 'NUM1' },
        { type: 'input_value', name: 'NUM2' }
      ],
      output: 'Number',
      colour: '#59C059',
      tooltip: 'Divide two numbers'
    });
  }
};

operatorBlocks['operator_random'] = {
  init: function() {
    this.jsonInit({
      type: 'operator_random',
      message0: 'pick random %1 to %2',
      args0: [
        { type: 'input_value', name: 'FROM' },
        { type: 'input_value', name: 'TO' }
      ],
      output: 'Number',
      colour: '#59C059',
      tooltip: 'Pick a random number between two bounds'
    });
  }
};

// ── Comparison Operators ──
operatorBlocks['operator_gt'] = {
  init: function() {
    this.jsonInit({
      type: 'operator_gt',
      message0: '%1 > %2',
      args0: [
        { type: 'input_value', name: 'OPERAND1' },
        { type: 'input_value', name: 'OPERAND2' }
      ],
      output: 'Boolean',
      colour: '#59C059',
      tooltip: 'Check if first value is greater than second value'
    });
  }
};

operatorBlocks['operator_lt'] = {
  init: function() {
    this.jsonInit({
      type: 'operator_lt',
      message0: '%1 < %2',
      args0: [
        { type: 'input_value', name: 'OPERAND1' },
        { type: 'input_value', name: 'OPERAND2' }
      ],
      output: 'Boolean',
      colour: '#59C059',
      tooltip: 'Check if first value is less than second value'
    });
  }
};

operatorBlocks['operator_equals'] = {
  init: function() {
    this.jsonInit({
      type: 'operator_equals',
      message0: '%1 = %2',
      args0: [
        { type: 'input_value', name: 'OPERAND1' },
        { type: 'input_value', name: 'OPERAND2' }
      ],
      output: 'Boolean',
      colour: '#59C059',
      tooltip: 'Check if first value equals second value'
    });
  }
};

// ── Logic Operators ──
operatorBlocks['operator_and'] = {
  init: function() {
    this.jsonInit({
      type: 'operator_and',
      message0: '%1 and %2',
      args0: [
        { type: 'input_value', name: 'OPERAND1', check: 'Boolean' },
        { type: 'input_value', name: 'OPERAND2', check: 'Boolean' }
      ],
      output: 'Boolean',
      colour: '#59C059',
      tooltip: 'True if both operands are true'
    });
  }
};

operatorBlocks['operator_or'] = {
  init: function() {
    this.jsonInit({
      type: 'operator_or',
      message0: '%1 or %2',
      args0: [
        { type: 'input_value', name: 'OPERAND1', check: 'Boolean' },
        { type: 'input_value', name: 'OPERAND2', check: 'Boolean' }
      ],
      output: 'Boolean',
      colour: '#59C059',
      tooltip: 'True if at least one operand is true'
    });
  }
};

operatorBlocks['operator_not'] = {
  init: function() {
    this.jsonInit({
      type: 'operator_not',
      message0: 'not %1',
      args0: [
        { type: 'input_value', name: 'OPERAND', check: 'Boolean' }
      ],
      output: 'Boolean',
      colour: '#59C059',
      tooltip: 'Logical negation'
    });
  }
};

// ── String Operators ──
operatorBlocks['operator_join'] = {
  init: function() {
    this.jsonInit({
      type: 'operator_join',
      message0: 'join %1 %2',
      args0: [
        { type: 'input_value', name: 'STRING1' },
        { type: 'input_value', name: 'STRING2' }
      ],
      output: 'String',
      colour: '#59C059',
      tooltip: 'Join two text strings'
    });
  }
};

operatorBlocks['operator_letter_of'] = {
  init: function() {
    this.jsonInit({
      type: 'operator_letter_of',
      message0: 'letter %1 of %2',
      args0: [
        { type: 'input_value', name: 'LETTER', check: 'Number' },
        { type: 'input_value', name: 'STRING' }
      ],
      output: 'String',
      colour: '#59C059',
      tooltip: 'Get the letter at the specified position'
    });
  }
};

operatorBlocks['operator_length'] = {
  init: function() {
    this.jsonInit({
      type: 'operator_length',
      message0: 'length of %1',
      args0: [
        { type: 'input_value', name: 'STRING' }
      ],
      output: 'Number',
      colour: '#59C059',
      tooltip: 'Get the number of characters in text'
    });
  }
};

operatorBlocks['operator_contains'] = {
  init: function() {
    this.jsonInit({
      type: 'operator_contains',
      message0: '%1 contains %2 ?',
      args0: [
        { type: 'input_value', name: 'STRING1' },
        { type: 'input_value', name: 'STRING2' }
      ],
      output: 'Boolean',
      colour: '#59C059',
      tooltip: 'Check if the first text contains the second text'
    });
  }
};

// ── Modulo, Round, Math Op ──
operatorBlocks['operator_mod'] = {
  init: function() {
    this.jsonInit({
      type: 'operator_mod',
      message0: '%1 mod %2',
      args0: [
        { type: 'input_value', name: 'NUM1', check: 'Number' },
        { type: 'input_value', name: 'NUM2', check: 'Number' }
      ],
      output: 'Number',
      colour: '#59C059',
      tooltip: 'Remainder of dividing the first number by the second'
    });
  }
};

operatorBlocks['operator_round'] = {
  init: function() {
    this.jsonInit({
      type: 'operator_round',
      message0: 'round %1',
      args0: [
        { type: 'input_value', name: 'NUM', check: 'Number' }
      ],
      output: 'Number',
      colour: '#59C059',
      tooltip: 'Round number to nearest integer'
    });
  }
};

operatorBlocks['operator_mathop'] = {
  init: function() {
    this.jsonInit({
      type: 'operator_mathop',
      message0: '%1 of %2',
      args0: [
        {
          type: 'field_dropdown',
          name: 'OPERATOR',
          options: [
            ['abs', 'abs'],
            ['floor', 'floor'],
            ['ceiling', 'ceiling'],
            ['sqrt', 'sqrt'],
            ['sin', 'sin'],
            ['cos', 'cos'],
            ['tan', 'tan'],
            ['asin', 'asin'],
            ['acos', 'acos'],
            ['atan', 'atan'],
            ['ln', 'ln'],
            ['log', 'log'],
            ['e ^', 'e ^'],
            ['10 ^', '10 ^'],
          ]
        },
        { type: 'input_value', name: 'NUM', check: 'Number' }
      ],
      output: 'Number',
      colour: '#59C059',
      tooltip: 'Perform mathematical calculation on number'
    });
  }
};

// ── Aliases for backwards compatibility ──
operatorBlocks['operator_contains_char'] = operatorBlocks['operator_contains'];
operatorBlocks['text_letter'] = operatorBlocks['operator_letter_of'];
operatorBlocks['text_contains'] = operatorBlocks['operator_contains'];
operatorBlocks['math_op'] = operatorBlocks['operator_mathop'];

// ── Visible literal reporter blocks for the toolbox ──
// These replace math_number (invisible in Zelos flyout) and text with clearly
// styled, colored reporter blocks the user can drag into inputs.

operatorBlocks['operator_number'] = {
  init: function () {
    this.jsonInit({
      type: 'operator_number',
      message0: '%1',
      args0: [
        {
          type: 'field_number',
          name: 'NUM',
          value: 0,
        }
      ],
      output: 'Number',
      colour: '#59C059',
      tooltip: 'A number value',
      style: 'math_blocks',
    });
  }
};

operatorBlocks['operator_string'] = {
  init: function () {
    this.jsonInit({
      type: 'operator_string',
      message0: '%1',
      args0: [
        {
          type: 'field_input',
          name: 'TEXT',
          text: 'hello',
        }
      ],
      output: 'String',
      colour: '#FF8B19',
      tooltip: 'A text/string value',
    });
  }
};
