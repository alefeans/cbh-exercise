# Refactoring

You've been asked to refactor the function `deterministicPartitionKey` in [`dpk.js`](dpk.js) to make it easier to read and understand without changing its functionality. For this task, you should:

1. Write unit tests to cover the existing functionality and ensure that your refactor doesn't break it. We typically use `jest`, but if you have another library you prefer, feel free to use it.
2. Refactor the function to be as "clean" and "readable" as possible. There are many valid ways to define those words - use your own personal definitions, but be prepared to defend them. Note that we do like to use the latest JS language features when applicable.
3. Write up a brief (~1 paragraph) explanation of why you made the choices you did and why specifically your version is more "readable" than the original.

You will be graded on the exhaustiveness and quality of your unit tests, the depth of your refactor, and the level of insight into your thought process provided by the written explanation.

## Your Explanation Here

The original implementation has some problems in terms of legibility, clarity, and conciseness, like:

- Nested `if/else` conditions making it hard to understand the "business rules" of the function;
- Redundant `if` conditionals (e.g checking the variable `candidate` value/type/size even after giving it a value in a _possible_ conditional before);
- Mutation of the variable `candidate` value in many places, making it hard to follow what is the current value of the variable;
- Implicit dependency of the `crypto` hashing function, making it _harder_ to test for a specific output (even though it is a deterministic function, we would have to know the hashed value to do the equality comparison in the test);

I believe the refactored code is more readable, simpler, and easy to understand due to the following factors:

- It has early returns and simpler conditionals (no nesting);
- It receives the hashing function as a dependency (curried), making it easier to test and to support different hashing functions in the future;
- It applies the appropriate rules for a received `event.partitionKey` in a specialized function;
- No mutability;
