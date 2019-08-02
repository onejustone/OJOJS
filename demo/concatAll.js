/**
 *
 */
Array.prototype.concatAll = function () {
  const result = []

  this.forEach(array => {
    result.push.apply(result, array)
  })

  // this.forEach(array => {
  //   result.push.bind(result, ...array)
  // })

  // this.forEach(array => {
  //   result.push(...array)
  // })

  return result
}

// export function concatAll (array) {
// }

// test
/**
 * var user = {
  id: 888,
  name: 'JerryHong',
  courseLists: [{
    "name": "My Courses",
    "courses": [{
      "id": 511019,
      "title": "React for Beginners",
      "coverPng": "https://res.cloudinary.com/dohtkyi84/image/upload/v1481226146/react-cover.png",
      "tags": [{ id: 1, name: "JavaScript" }],
      "rating": 5
    }, {
      "id": 511020,
      "title": "Front-End automat workflow",
      "coverPng": "https://res.cloudinary.com/dohtkyi84/image/upload/v1481226146/react-cover.png",
      "tags": [{ "id": 2, "name": "gulp" }, { "id": 3, "name": "webpack" }],
      "rating": 4
    }]
  }, {
    "name": "New Release",
    "courses": [{
      "id": 511022,
      "title": "Vue2 for Beginners",
      "coverPng": "https://res.cloudinary.com/dohtkyi84/image/upload/v1481226146/react-cover.png",
      "tags": [{ id: 1, name: "JavaScript" }],
      "rating": 5
    }, {
      "id": 511023,
      "title": "Angular2 for Beginners",
      "coverPng": "https://res.cloudinary.com/dohtkyi84/image/upload/v1481226146/react-cover.png",
      "tags": [{ id: 1, name: "JavaScript" }],
      "rating": 4
    }]
  }]
};
 */

var courseLists = [{
  "name": "My Courses",
  "courses": [{
    "id": 511019,
    "title": "React for Beginners",
    "covers": [{
      width: 150,
      height: 200,
      url: "http://placeimg.com/150/200/tech"
    }, {
      width: 200,
      height: 200,
      url: "http://placeimg.com/200/200/tech"
    }, {
      width: 300,
      height: 200,
      url: "http://placeimg.com/300/200/tech"
    }],
    "tags": [{
      id: 1,
      name: "JavaScript"
    }],
    "rating": 5
  }, {
    "id": 511020,
    "title": "Front-End automat workflow",
    "covers": [{
      width: 150,
      height: 200,
      url: "http://placeimg.com/150/200/arch"
    }, {
      width: 200,
      height: 200,
      url: "http://placeimg.com/200/200/arch"
    }, {
      width: 300,
      height: 200,
      url: "http://placeimg.com/300/200/arch"
    }],
    "tags": [{
      "id": 2,
      "name": "gulp"
    }, {
      "id": 3,
      "name": "webpack"
    }],
    "rating": 5
  }]
}, {
  "name": "New Release",
  "courses": [{
    "id": 511022,
    "title": "Vue2 for Beginners",
    "covers": [{
      width: 150,
      height: 200,
      url: "http://placeimg.com/150/200/nature"
    }, {
      width: 200,
      height: 200,
      url: "http://placeimg.com/200/200/nature"
    }, {
      width: 300,
      height: 200,
      url: "http://placeimg.com/300/200/nature"
    }],
    "tags": [{
      id: 1,
      name: "JavaScript"
    }],
    "rating": 5
  }, {
    "id": 511023,
    "title": "Angular2 for Beginners",
    "covers": [{
      width: 150,
      height: 200,
      url: "http://placeimg.com/150/200/people"
    }, {
      width: 200,
      height: 200,
      url: "http://placeimg.com/200/200/people"
    }, {
      width: 300,
      height: 200,
      url: "http://placeimg.com/300/200/people"
    }],
    "tags": [{
      id: 1,
      name: "JavaScript"
    }],
    "rating": 5
  }]
}];

/**
 * [
    {
      id: 511019,
      title: "React for Beginners",
      cover: "http://placeimg.com/150/200/tech"
    }, {
      id: 511020,
      title: "Front-End automat workflow",
      cover: "http://placeimg.com/150/200/arch"
    }, {
      id: 511022,
      title: "Vue2 for Beginners",
      cover: "http://placeimg.com/150/200/nature"
    }, {
      id: 511023,
      title: "Angular2 for Beginners",
      cover: "http://placeimg.com/150/200/people"
    },
 ]
 */

const allCourse = courseLists.map(list =>
    list.courses.map(course =>
      course.covers
        .filter(cover => cover.width === 150)
        .map(item => ({ id: course.id, title: course.title, cover: item.url }))
  ).concatAll()
).concatAll()

console.log(allCourse)

