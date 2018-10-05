<template>
    <div class="three col">
        <div class="loader" id="loader-1"></div>

        <div class="text-center text-loader"><slot></slot></div>
    </div>
</template>

<style scoped="">

    .loader {
        width: 28px;
        height: 28px;
        position: relative;
        margin: 120px auto 0 auto;
    }

	.text-loader {
		font-size: 12px;
		margin-top: 14px;
	}

    /* LOADER 1 */
    #loader-1:before,
    #loader-1:after {
        content: "";
        position: absolute;
        /*top: -10px;
        left: -10px;*/
        width: 100%;
        height: 100%;
        border-radius: 100%;
        border: 2px solid transparent;
        border-top-color: #3498db;
    }



    #loader-1:before {
        z-index: 100;
        animation: spin 1s infinite;
    }

    #loader-1:after {
        border: 2px solid #ccc;
    }

    @keyframes spin {
        0% {
            -webkit-transform: rotate(0deg);
            -ms-transform: rotate(0deg);
            -o-transform: rotate(0deg);
            transform: rotate(0deg);
        }
        100% {
            -webkit-transform: rotate(360deg);
            -ms-transform: rotate(360deg);
            -o-transform: rotate(360deg);
            transform: rotate(360deg);
        }
    }
</style>
