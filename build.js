const fs = require('fs')
const Velocity = require('velocityjs');
const YAML = require('yaml');
var mime = require('mime-types')

const file = fs.readFileSync('framework/framework.yml', 'utf8')
const framework = YAML.parse(file)

function renderLanscape(projectsView, technologiesView) {
    try {
        const template = fs.readFileSync('templates/landscape.vm', 'utf8')
        const rendered = Velocity.render(template, { projectsView: projectsView, technologiesView: technologiesView, framework: JSON.stringify(framework, null, 0) })
        fs.writeFileSync('build/index.html', rendered)
    } catch (err) {
        console.error(err)
    }
}

function readFilesFromDirectory(directory) {
    const parsedFiles = [];
    fs.readdirSync(directory).forEach(filename => {
        const file = fs.readFileSync(directory + '/' + filename, 'utf-8')
        const parsedFile = YAML.parse(file)
        parsedFiles.push(parsedFile)
    });
    return parsedFiles
}

function createTechnologiesView(technologies) {
    const technologyFramework = framework.Technologies
    const view = {}
    Object.keys(technologyFramework).forEach((layer) => {
        const items = technologyFramework[layer]
        view[layer] = {}
        items.forEach(item => {
            const filteredTechnologies = technologies.filter(technology => technology.categories.includes(item))
            filteredTechnologies.forEach(technology => {
                technology = addLogo(technology)
            })
            view[layer][item] = filteredTechnologies.sort((a,b) => a.group == 1 ? 1 : -1)
        })
    })
    return view
}

function createProjectsView(projects) {
    const projectFramework = framework.Projects
    const view = []

    projectFramework.forEach((projectCategory) => {
        view[projectCategory] = []
        const filteredProjects = projects.filter(project => project.category == projectCategory)
        filteredProjects.forEach(project => {
            view[projectCategory].push(addLogo(project))
        })
    })

    return view
}

function addLogo(item) {
    if (item.logo) {
        const mimeType = mime.lookup(item.logo)
        item.logoData = 'data:' + mimeType + ';base64,' + fs.readFileSync(item.logo, 'base64')
    } else {
        console.log(item.name + ' - Logo missing')
    }
    return item
}

const technologies = readFilesFromDirectory('technologies')
const projects = readFilesFromDirectory('projects')

const technologiesView = createTechnologiesView(technologies)
const projectsView = createProjectsView(projects)

renderLanscape(projectsView, technologiesView)