![recommended node version](https://img.shields.io/badge/node-v16-green)

# Angular + ButterCMS Starter Project

This Angular starter project fully integrates with dynamic sample content from your ButterCMS account, including main menu, pages, blog posts, categories, and tags, all with a beautiful, custom theme with already-implemented search functionality. All of the included sample content is automatically created in your account dashboard when you sign up for a free trial of ButterCMS.



## 1. Installation

First, clone the repo and install the dependencies by running `npm install`

```bash
git clone https:
cd react-starter-buttercms
npm install
```

### 2. Set API Token

To fetch your ButterCMS content, add your API token as an environment variable.

### 3. Run local server

To view the app in the browser, you'll need to run the local development server:

```bash
$ npm run start
```

Congratulations! Your starter project is now live at [http://localhost:4200/](http://localhost:4200/).

## 4. Deploy on Vercel


### 5. Webhooks

The ButterCMS webhook settings are located at https://buttercms.com/webhooks/

### 6. Previewing Draft Changes

By default, your starter project is set up to allow previewing of draft changes saved in your ButterCMS.com account. To disable this functionality, set the following value in your .env file: REACT_APP_BUTTER_CMS_PREVIEW=false
