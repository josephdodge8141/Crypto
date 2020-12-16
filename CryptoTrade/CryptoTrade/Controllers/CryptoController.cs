using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using System.Net.Http;

namespace CryptoTrade.Controllers
{
    public class CryptoController : Controller
    {
        static readonly HttpClient client = new HttpClient();

        public static async Task GetPrices()
        {
            // Call asynchronous network methods in a try/catch block to handle exceptions.
            try
            {
                string uri = "http://www.contoso.com";
                string responseBody = await client.GetStringAsync(uri);

                Console.WriteLine(responseBody);
            }
            catch (HttpRequestException e)
            {
                Console.WriteLine("\nException Caught!");
                Console.WriteLine("Message :{0} ", e.Message);
            }
            
        }
    }
}
