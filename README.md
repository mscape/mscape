# mscape.io - A Community-driven Metaverse Landscape

The metaverse landscape is a community-driven website that tracks metaverse projects and technologies. It gives an overview of the current state of the metaverse landscape, relevant projects and technologies and the key facts and information associated with them.
The metaverse landscape is structured along a 4-layer framework. It groups projects by their applications and technologies based on experiences, user capabilities and infrastructure. Each technology layer is split up into various capabilities. The framework will evolve over time as the space will evolve as well. The metaverse landscape is kept minimalistic and self-contained with just a few dependencies on purpose. The most recent version is always deployed to IPFS, a dencentralized storage network. You can reach latest versions here: [Landing page](https://mscape.io) and [landscape](https://landscape.mscape.io).

## Getting Started

We use `npm` in this project and commit the `package-lock.json` file.

1. Install dependencies with `npm install`.
2. Setup your environment with a `.env` file. See [intructions](#setup-environment).
3. Run command `npm run all`. See further [commands](#commands).

The metaverse landscape is now available at `build/index.html` and deployed to IPFS. You can open the IPFS version by using the CID (printed during deployment phase) and the IPFS gateway `https://ipfs.io/ipfs/{YOUR_CID}`. Some browsers, like Brave, support IPFS natively with `ipfs://{YOUR_CID}`.

## Generating a landscape

Generating a landscape consists of two phases:
1. Build: Read the yaml data set, visualize it and generate (single) HTML landscape
2. (Local) Deployment: Deploy the generated HTML landscape and landing page to IPFS

## Setup environment

In the root folder create a `.env` file with the following content:

```ini
API_TOKEN={YOUR_WEB3_STORAGE_API_KEY}
```

Please refer to the [Web3.Storage documentation](https://docs.web3.storage/) for further information on how to obtain an API token. Production environment variables should be set in Github Actions secrets.

## Production deployment

The production deployment of the official mscape landscape and landing page currently uses [Fleek](https://fleek.co/) and Github Actions. Fleek handles the deployment of both websites to IPFS and additionally takes care of IPNS entries and TLS encryption. There are two configuration files located in the repository:
1. `landingpage.fleek.json`: Fleek configuration to deploy landing page
2. `landscape.fleek.json`: Fleek configuration to build and deploy landscape
  
Additionally, an environment variable `FLEEK_API_KEY` should be populated to Github secrets.

The npm `deploy` commands should only be used locally for test and development purposes.

## Project structure

The metaverse landscape repository consists of the following directories:
- `projects`: Consists of yaml data sets for projects
- `technologies`: Consists of yaml data sets for technologies
- `templates`: Consists of Velocity templates to generate static landscape website
- `logos`: Consists of logos for projects and technologies
- `landingpage`: Consists of HTML and assets for the landing page

## Commands

The metaverse landscape provides a set of commands:

- `npm run all`: Runs build and deployment
- `npm run build`: Runs build of lanscape
- `npm run cleanup:build`: Runs cleanup of build directory
- `npm run deploy`: Runs deployment of landscape and landingpage
- `npm run deploy:landscape`: Runs deployment of landscape only
- `npm run deploy:landingpage`: Runs deployment of landingpage only

## Contribute

The metaverse landscape is a community-driven open-source project which means everyone can contribute. There are two ways to contribute to the metaverse landscape:

1. Contribute by evolving the framework
2. Contribute by adding a new project or technology

### Contribute by evolving the framework

To contribute to the framework, please follow the instructions:

1. Change `framework/framework.yml` with your changes
2. Create a pull request with the respective commits

*Note:* Add additional rational and description to the pull request to ensure plausability of your changes.

### Contribute by adding a new project or technology

To contribute a new project or technology, please follow the instructions:

1. Decide for project or technology
2. Create a new data set in respective directory (`projects`/`technologies`) based on YAML examples
3. Add a logo
4. Create a pull request with the respective commits

#### Decide for project or technology

In the metaverse landscape, we distinguish between projects and technologies. Projects are metaverse experiences (e.g., games, 3D galleries, ...) that are built with the use of technologies. Technologies are supportive and enabling to projects. Technologies can be assigned to the capabilities listed by our framework. Feel free to explore the current version of the metaverse landscape to get a sense for projects and technologies.

#### Create a new data set

Create a new file `{name}.yml` in the respective folder `projects`/`technologies`. The filename must be in lowercase without any special characters or spaces and must be equal to the name of the project/technology.

Example project `decentraland.yml`:
```yaml
name: Decentraland
twitterHandle: decentraland
status: Live
website: https://decentraland.org
category: Open virtual world
metaverseNative: 0
threeD: 1
openWorld: 1
userContent: 1
access:
  - Web
token: N/A
description: Decentraland is a decentralized virtual reality platform powered by
  the Ethereum blockchain. Within the Decentraland platform, users can create,
  experience, and monetize their content and applications.
publish: 1
logo: logos/projects/decentraland.svg
```

Example technology `ipfs.yml`:
```yaml
name: IPFS
company: Protocol Labs
layer: Infrastructure
categories:
  - Fast geo-replicated caches
metaverseNative: 0
description: IPFS is a peer-to-peer hypermedia protocol developed by Protocol
  Labs. IPFS is decentralized and content-addressable. IPFS powers applications
  like Filecoin.
website: https://ipfs.io/
github: ipfs/go-ipfs
twitterHandle: IPFS
publish: 1
group: 0
logo: logos/technologies/ipfs.png
```

#### Add a logo

Add the logo in the respective logo folder `logos/projects`/`logos/technologies`. Filename should match the filename of the data set yaml file. SVG images with transparent background are preferred.

#### Create a new Pull Request 

Create a Pull Request with your commited changes. Your pull request message should start with `Contribution: {NAMES}` - NAMES can be a list of names. If you have multiple contributions, you can add them all in one pull request. We will review it and publish it as soon as possible.

### Conventions

Please follow the following conventions:
- Data sets must always be lowercase without any special characters or spaces with file suffix `.yml`
- Logos must be placed in logos/{project/technologies} directory
- Logo filenames must always be lowercase without any special characters or spaces and should be added to respective YAML file as a URL
- Logos should always be SVG images if available, otherwise use PNG with transparent background
- Twitter handles must not contain a #
- GitHub links must follow the structure `{ORGANIZATION}/{REPOSITORY}`