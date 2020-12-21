module.exports = {
    upload: {
        provider: "google-cloud-storage",
        providerOptions: {
            bucketName: "igem-strapi",
            publicFiles: false,
            uniform: false,
            basePath: "",
        },
    },
}
