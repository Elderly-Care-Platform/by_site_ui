define([], function () {

    function ShoppingConfirmationFactory($log,
                                         urlTemplate,
                                         REST_URL,
                                         CachedRequestHandler, $http, APPLICATION) {

        $log.debug('Inside ShoppingConfirmationService');

        var confirmationService, urls, invoicePrintWindow;
        urls = {
            makePayment: urlTemplate(REST_URL.makePayment + '?customerId=:customerId'),
            checkout: urlTemplate(REST_URL.checkout + '?customerId=:customerId')
        };

        confirmationService = angular.extend(
            {},
            CachedRequestHandler,
            {
                modelName: 'order',
                baseURL: urls.base,
                urls: urls
            },
            {
                makePayment: makePayment,
                checkout: checkout,
                printInvoice : printInvoice
            }
        );
        return confirmationService;

        function makePayment(params, postData) {
            return this.$post(urls.makePayment(params), postData.paymentInfo);
        }

        function checkout(params, postData) {
            return this.$post(urls.checkout(params), postData.order);
        }


        function printInvoice(id) {
            if(invoicePrintWindow){
                invoicePrintWindow.close();

            }
            $.get(APPLICATION.host+"/cart/checkout/getOrderSummary/"+id, function (data) {
                invoicePrintWindow = window.open('about:blank', id);
                invoicePrintWindow.document.write(data);
                invoicePrintWindow.setTimeout(function(){
                    invoicePrintWindow.print();
                },2000);
            });

        }

    }

    return ShoppingConfirmationFactory;
});