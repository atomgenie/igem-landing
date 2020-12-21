module.exports = {
    upload: {
        provider: "google-cloud-storage",
        providerOptions: {
            bucketName: "igem-strapi",
            publicFiles: true,
            uniform: false,
            basePath: "",
        },
    },
}
