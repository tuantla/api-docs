const axios = require('axios')

var swaggers = [
   'http://52.77.221.207:8083/v2/api-docs',
   'http://52.77.221.207:8090/v2/api-docs',
   'http://52.77.221.207:8081/v2/api-docs',
   'http://52.77.221.207:8082/v2/api-docs'

]


var allSwagger =  async () => {
    var asyncSwaggers = swaggers.map(swagger => axios.get(swagger))
    return axios.all(asyncSwaggers)
}

const pathWithNewTag = (path, newTag, summary) => {
    let newPath =  Object.assign({}, path)
    Object.keys(path).forEach((key) => {
        newPath[key].tags = [newTag]
        newPath[key].summary = summary
    })
    return newPath;
}

const modifyPathForMerge = (paths, newTag) =>{

    Object.keys(paths).forEach((key) => {
        paths[key] = pathWithNewTag(paths[key], newTag, key)
    })

    return paths
}

const mergeApiSpec = (apiSpecs) => {
    let mergedSpec = Object.assign({},apiSpecs[0])

    const reducer = (previos, current) => {
        let tags =  previos.tags.concat(current.tags)
        let paths = Object.assign({}, previos.paths, current.paths)
        let definitions = Object.assign({}, previos.definitions, current.definitions)
        return {tags, paths, definitions}
    }

    let mergedObject =
    apiSpecs.map(spec => {
        let definitions = spec.definitions
        let tags = [spec.info.title]
        let paths = modifyPathForMerge(spec.paths, spec.info.title)
        return {tags, paths, definitions}
    })
    .reduce(reducer, {tags:[], paths: {}, definitions: {}})

    mergedSpec.paths = mergedObject.paths
    mergedSpec.tags = mergedObject.tags.map(tag => {return {name: tag, description: tag}})
    mergedSpec.definitions = mergedObject.definitions

    return mergedSpec
}

const router = async (req, res) => {
  var results = await  allSwagger()
  var apiSpecs = results.map(result => result.data)

  let responseJson = mergeApiSpec(apiSpecs)
  res.json(responseJson)

}

module.exports = router