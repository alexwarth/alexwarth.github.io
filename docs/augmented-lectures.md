# Augmented Lectures

Are you familiar with _Explorable Explanations_? (See [Bret Victor's original essay](http://worrydream.com/ExplorableExplanations/), and [Nicky Case's collection](http://explorabl.es/).) These are explanations that include dynamic models of powerful ideas that the reader can play with in order to better understand the material.

Alan Kay's criticism of EEs is that the reader should be able to [look under the hood](http://worrydream.com/refs/Kay%20-%20Opening%20the%20Hood%20of%20a%20Word%20Processor.pdf) and see the code that powers the dynamic model. But just seeing the code is not useful unless the reader can understand it. And most of these models are written in traditional programming languages (e.g., JavaScript) which makes them much larger and more complicated than we'd like them to be — certainly beyond the grasp of the EE's intended audience.

[My research group at HARC](https://harc.ycr.org/flex/) has been exploring a scenario that we like to call _Augmented Lectures_. In an augmented lecture, the teacher creates (or programs) a dynamic model of the idea that she is teaching, _in the classroom, during the lecture_. It's important that the students be able to understand the "program" that the teacher is writing, even if they're not able to write that program on their own. Also, the act of programming the dynamic model must not break the flow of the lecture. (We call this **programming at the speed of conversation**, and our hope is that the techniques and ideas we develop for this will also be useful as a basis for "tools for thinking".)

Here's an example of what an augmented lecture for perspective drawing / vanishing points might look like:

<video width="480" poster="http://alexwarth.github.io/media/perspective.poster.png" controls>
  <source src="http://alexwarth.github.io/media/perspective.mp4" type="video/mp4"/>
</video>

This is just a sketch; in a real augmented lecture, we would want the "rules" (the constraints, in this case) that power the dynamic model to be visible at all times, and they should probably be expressed at a higher level of abstraction. Still, this sketch shows that it is in fact possible for teachers to program models of powerful ideas without breaking the flow of a lecture.

We have been exploring other topics for augmented lectures, e.g., garbage collection and probability. While each of these may initially require a different domain-specific language or mechanism, we expect that we'll be able to design a set of generally useful mechanisms once we tackle enough examples.

-- Alex Warth, July 2017
