# Learning Playwright Batch

A comprehensive learning resource covering JavaScript fundamentals and Playwright testing with example scripts and real-world scenarios.

## Project Structure

### Chapter 1: Basics
- **Topics**: Basic JavaScript setup, step-by-step examples, environment verification, and hot code reloading
- **Files**: 01_basic.js, 02_JS_Step_By_Step.js, 03_verify_setup.js, 04_hot_code.js
- **Key Concepts**: Getting started with JavaScript, environment setup verification

### Chapter 2: JavaScript Concepts & Hoisting
- **Topics**: Comments, identifiers, variable declarations (var, let, const), hoisting behavior
- **Files**: 05_Core_Comments_JS.js, 06_Core_Identifier_JS.js, 07_var_let_const.js, 09_Hoisting.js, 14_let_hoisting.js, 18_const.js
- **Key Concepts**: 
  - Variable scoping and declaration methods
  - Hoisting with var, let, and const
  - Function and block-level hoisting
  - Temporal Dead Zone

### Chapter 3: Identifiers, Literals, Operators & Statements
- **Topics**: Identifier naming conventions, literal values (strings, numbers, booleans), operators, null/undefined
- **Files**: 19_Identifier.js, 20_literla.js, 21_literals_all.js, 22_nul_typepf.js, 23_null_undefined.js, 24_equla_triequal.js, 25_IQ.js
- **Key Concepts**: 
  - Identifier rules and naming conventions
  - Different literal types
  - Equality operators (==, ===)
  - Type checking

### Chapter 4: Operators
- **Topics**: Assignment, comparison, logical, string, ternary, and type operators
- **Files**: 26_Assigned_Operator.js, 27_Assignment_Operators.js, 28_Comparsion_Operators.js, 29_Logical_Operators.js, 30_String_Operators.js, 31_Ternary_Operators.js, 31_Type_Operators.js, 32_Null_Optinal_Value.js
- **Key Concepts**:
  - Assignment operators and compound assignments
  - Comparison operators
  - Logical operators (&&, ||, !)
  - String concatenation and operations
  - Ternary conditional operator
  - Type checking operators

### Chapter 5: Conditional Statements (If/Else)
- **Topics**: If-else statements, nested conditions, real-world applications, API response handling
- **Files**: 33_Statement.js, 34_If_else_If.js, 35_REAL_LIVE_Example.js, 36_API_IF_ELSE.js, 37_IQ_IF_ESLE.js, 38_Logical_Op_IF_ELSE.js, 40_REAL_IF_ELSE.js
- **Key Concepts**:
  - Conditional branching
  - If-else-if chains
  - Real-world decision making
  - API response validation

### Chapter 6: Switch Statements
- **Topics**: Switch case syntax, break statements, default cases, grouped cases, real examples
- **Files**: 42_Switch.js, 43_Switch_with_Break.js, 44_Switch_with_Default.js, 45_Switch_REAL_EXAMPLE.js, 46_Switch_GroupCase.js
- **Key Concepts**:
  - Switch statement structure
  - Case fallthrough
  - Default handling
  - Grouped cases
  - When to use switch vs if-else

### Chapter 7: Loops
- **Topics**: For loops, while loops, do-while loops, increment operators, loop control
- **Files**: 53_Loops.js, 54_Incremnt_operator.js, 56_For_Loops.js, 57_For_Loop.js, 59_While_Loop.js, 61_DO_while.js
- **Key Concepts**:
  - For loop iterations
  - While and do-while loops
  - Pre and post increment operators
  - Loop control flow

### Chapter 8: Arrays
- **Topics**: Array creation, access and modification, adding/removing items, searching, iterating, transforming, sorting, slicing, copying, and destructuring
- **Files**: 63_Arrays_Creation.js, 64_Array_Access_Modify.js, 65_Arrays_Adding_Remove.js, 66_Array_REAL.js, 67_Array_Searching.js, 68_Arrays_Iterating.js, 69_Arrays_Transforming_Arrays.js, 70_Array_Sorting.js, 71_Arrays_Slicing.js, 72_Arrays_Checking.js, 73_Arrays_Copying_Shallow_Deep.js, 74_Arrays_Destructuring.js, 75_Task.js
- **Key Concepts**:
  - Creating arrays with literals, constructors, `Array.of()`, and `Array.from()`
  - Accessing, updating, and removing elements
  - Using `map()`, `filter()`, and `reduce()` for transformations
  - Sorting, slicing, shallow vs deep copying, and destructuring

### Chapter 9: Functions
- **Topics**: Function basics, function types, expressions, arrow functions, IIFE, default parameters, rest/spread, scope, hoisting, closures, pure functions, higher-order functions, and callbacks
- **Files**: 76_Functions.js, 77_Type1_Fn_Basic_Functions.js, 78_Type2_Fn_With_Arg_No_Return.js, 79_Type3_Fn_without_Arg_Return_Type.js, 80_Type4_Fn_With_Arg_With_Return.js, 81_Ex.js, 82_Fn_Expression.js, 83_Fn_Arrow.js, 84_Ex_API_Testing.js, 85_Fn_IIFE.js, 86_IQ.js, 87_Default_Parameter.js, 88_Rest_Parameters_Fn.js, 89_IQ_Fn.JS, 90_Spead_Fn.js, 91_Return_Fn.js, 92_Hoisting_Fn.js, 93_Scope_Fn.js, 94_Closure.js, 95_Closure_Part2.js, 96_Closures_Part2.js, 97_Closure_Part4.js, 98_Higher_Order_Fn.js, 99_Pure_Fn.js, 100_Callback_Fn.js, 101_Callback_me.js
- **Key Concepts**:
  - Writing reusable logic with parameters and return values
  - Function declarations, expressions, and arrow functions
  - Scope, hoisting, closures, and execution context
  - Higher-order functions, pure functions, and callback patterns

### Chapter 10: Strings
- **Topics**: String creation, properties, searching and checking, string transformations, and type conversion
- **Files**: 102_Strings.js, 103_String_Properties.js, 104_Strings_Search_Check.js, 105_Strings_P2.js, 106_Transforming_Strings.js, 107_String_Conversion.js
- **Key Concepts**:
  - Creating strings with single quotes, double quotes, and template literals
  - Working with string length, indexing, and immutability
  - Searching with `includes()`, `indexOf()`, and related checks
  - Transforming strings with trim, replace, split, join, and conversion methods

## Additional Resources

- **Interview Questions**: Task_Interview_Coding_Questions/ - Practical coding challenges (grade calculator, FizzBuzz, etc.)
- **Playwright Tests**: PW_JS_Test_1/ - Test automation examples
- **Playwright MCP Materials**: Lecture_Playwright_MCP/ - Test plans, demo assets, and STLC-related examples

## Prerequisites

- Node.js (14+ recommended)
- npm or yarn

## Quick Start

1. **Install dependencies**:
```bash
npm install
npm install -D @playwright/test
```

2. **Install Playwright browsers** (if using Playwright):
```bash
npx playwright install
```

3. **Run Playwright tests** (if applicable):
```bash
npx playwright test
```

4. **Run JavaScript examples**:
```bash
node chapter_01_Basics/01_basic.js
node chapter_02_Java_Concepts/07_var_let_const.js
node chapter_08_Arrays/63_Arrays_Creation.js
node chapter_09_Functions/76_Functions.js
node chapter_10_Strings/102_Strings.js
```

## Learning Path

Follow chapters 1-10 sequentially to build a solid foundation in JavaScript fundamentals:
1. Start with Chapter 1 for environment setup
2. Master variable concepts in Chapter 2
3. Learn identifiers and operators in Chapters 3-4
4. Understand control flow with Chapters 5-6
5. Practice iteration with Chapter 7
6. Build confidence with arrays in Chapter 8
7. Learn reusable logic and closures in Chapter 9
8. Work with text handling in Chapter 10
9. Apply knowledge to interview questions and Playwright examples

## License

ISC
