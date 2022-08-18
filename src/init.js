export default class Init
{
    constructor(sos) {
        this.sos = sos
        this.timeout = 15000
        // retrieve the api to connect from sos config or use the default api for development purposes
        this.api = this.sos.config?.api || 'https://api.flyo.cloud/integration/signageos/29/WZWj7lyl9dQ80PugsYZNh3-B25Q8glwmenBwrmhvFf9bG-aQYxW18sKsmc2-RtIMvz0SiqyWVHBwiSyKRNjTD5GKbniW'
    }

    async getApiResponse() {
        const response = await fetch(this.api);
        return await response.json()
    }

    getTimeout() {
        return this.timeout
    }

    async getSlides() {
        const apiResponse = await this.getApiResponse()
        this.timeout = apiResponse.config?.timeout || 15000
        const slides = apiResponse.data
        

        // send log files back to signageos
        // https://sdk.docs.signageos.io/api/js/content/latest/js-command#dispatch
        // only 100 chars.
        await this.sos.command.dispatch({
            type: 'Content.update',
            content: JSON.stringify(apiResponse.config)
        });

        // Save all files parallel
        await Promise.all(slides.map(async (content) => {
            try {
                content.uid = `image-${content.uid}`
                content.uri = `${content.image}`
                // Store files to offline storage (https://docs.signageos.io/api/js/content/latest/js-offline-cache-media-files)
                const {
                    filePath
                } = await sos.offline.cache.loadOrSaveFile(content.uid, content.uri);
                content.filePath = filePath;
            } catch (error) {
                console.log('offline image download error', error)
            }
        }))
        .catch(function(err) {
            console.log('Download Error', err.message); 
        });

        await this.sos.command.dispatch({
            type: 'Content.update',
            content: JSON.stringify(slides.map(slide => {
                return {uid: slide.uid}
            }))
        });

        return slides
    }
}