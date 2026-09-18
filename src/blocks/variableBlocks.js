// techyblocks variable blocks — show variable, hide variable, change variable
import * as Blockly from 'blockly';

export const variableBlocks = {};

variableBlocks['show_variable'] = {
  init: function() {
    this.jsonInit({
      type: 'show_variable',
      message0: 'show variable %1',
      args0: [
        {
          type: 'field_variable',
          name: 'VAR',
          variable: '%{BKY_VARIABLES_DEFAULT_NAME}',
        }
      ],
      previousStatement: null,
      nextStatement: null,
      colour: '#FF8C1A',
      tooltip: 'Show the variable on the stage',
      helpUrl: '',
    });
  }
};

variableBlocks['variables_show'] = variableBlocks['show_variable'];

variableBlocks['hide_variable'] = {
  init: function() {
    this.jsonInit({
      type: 'hide_variable',
      message0: 'hide variable %1',
      args0: [
        {
          type: 'field_variable',
          name: 'VAR',
          variable: '%{BKY_VARIABLES_DEFAULT_NAME}',
        }
      ],
      previousStatement: null,
      nextStatement: null,
      colour: '#FF8C1A',
      tooltip: 'Hide the variable from the stage',
      helpUrl: '',
    });
  }
};

variableBlocks['variables_hide'] = variableBlocks['hide_variable'];

variableBlocks['variables_change'] = {
  init: function() {
    this.jsonInit({
      type: 'variables_change',
      message0: 'change %1 by %2',
      args0: [
        {
          type: 'field_variable',
          name: 'VAR',
          variable: '%{BKY_VARIABLES_DEFAULT_NAME}',
        },
        {
          type: 'input_value',
          name: 'VALUE',
          check: 'Number',
        }
      ],
      previousStatement: null,
      nextStatement: null,
      colour: '#FF8C1A',
      tooltip: 'Change the value of a variable',
      helpUrl: '',
    });
  }
};
