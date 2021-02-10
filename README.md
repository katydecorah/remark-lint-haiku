# remark-lint-haiku

A [remark-lint](https://github.com/remarkjs/remark-lint) plugin to assert haiku is in 5, 7, 5 syllable pattern. Uses [syllable](https://github.com/words/syllable) for counting syllables.

## Install

```sh
npm install remark-lint-haiku
```

## Example

### `ok.md`

#### Input

~~~
# My haiku

```haiku
Parallelogram
I tried to cut from fabric
I cut a rhombus
```
~~~

#### Output

No messages.

### `not-ok.md`

#### Input

~~~
# My haiku

```haiku
Parallelogram
I tried to cut from paper
I cut a rhombus
```
~~~

#### Output

```
3:1-7:4: "I tried to cut to from paper" (8), it should have 7 syllables.
```
