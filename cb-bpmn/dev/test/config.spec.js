const HD = require('@docbrasil/tools');
const expect = require('chai').expect;
const Mongo = require('../domains/helpers/modules/mongo');

let config;
let configData = {
    "categories" : {
        "tree" : [
            {
                "children_d" : [

                ],
                "children" : [

                ],
                "parents" : [
                    "#"
                ],
                "data" : null,
                "state" : {

                },
                "a_attr" : {
                    "href" : "#"
                },
                "li_attr" : {
                    "id" : "0"
                },
                "icon" : true,
                "text" : "[Sem Categoria]",
                "id" : "0"
            },
            {
                "children_d" : [
                    "fe0cc6c3abb85023422421fcd6ed3446",
                    "d3cea25408e238e5143f34bc24e16ef5",
                    "33c573f5f1446718fb5d25fb47319b28",
                    "199a86a9ec2cd637adb0db6ab9977064",
                    "15532b48643a1c0bc91d46ce2e21b53f",
                    "6b8a4756ff926835765715057ae4d240",
                    "d7dd271b8a6b2a72d9ca975ff0b867ec",
                    "af1bd9c82d9a3a1352ea60db87193a7a",
                    "9e01641e6d6c85d62e98f4e9784640cf",
                    "f263673d4cb28a3bd2bd6b27a589d5c9",
                    "d92a30048a1114d4d6d3f0c1fc066b66",
                    "25e770d9fbca8d00b3347a04897b56a0",
                    "dfe2854d1b9909247a56372273fe749d",
                    "cca6c536ec85b86105b3013c1d5321cb",
                    "ec37d84ed96a03791c78127014605d84",
                    "0391b5d5f9b374854f042d016a697d55",
                    "7a5cecf0790dbafd269d60a00764a3d5",
                    "607a7c108cf6c5cdf4fa5fe0b82ea629",
                    "403968b638de3b50b92b26d4b5f5efa8",
                    "c992e37cce2f683c5c39dda9f5bf542c",
                    "94828b2107e9c5143ac8f4bba83e35ba",
                    "7069d6df62d608ff3d2ef2f0adfea2fa",
                    "4468f963069516fe2a1483fd39981f65",
                    "4cecdf078819bea8fb9a4082c569fdc5",
                    "34fbd0d689db3335408563ac8a29d453",
                    "b87abe0dd15c0cd94799938e5ec46d68",
                    "ee7cc57dc1db680baf38093ac5d50b47",
                    "e60ca50ff3d315f85ef4ac948a8dca8b",
                    "ba21c668394d487fc1192daf0e26f323",
                    "ced2debb7b85ee7fb98f3aaeb1abcf27",
                    "5780d6e232072191fce417bf3ee28841",
                    "cda21cbc4092fd55a2356fb742918f17",
                    "23d475cd87aaae427ad5ce4b19aa18ef",
                    "a79d33c98ce5f435625d54545b41b224",
                    "82b6371a3b4c9b293a11e2b4e264c319",
                    "8b2fcd729d00b648350e2f21114caef0",
                    "0b25aee33c1e4a214e44986fa0e186c1",
                    "0ebd078607e2acbb520de216db36487f",
                    "3e0514449b0fef556d70ca2ba5ce2d6c",
                    "a75d6da0184ad89b168042e5e20bc5d1",
                    "d1cc1a413420a7721eba692a877b8fed",
                    "338018ecf3c8ddbadd72c4049f42dca9",
                    "83b7e67b96548217d5a1bd465d16941c",
                    "f46041daadbd51f94ecaf765d63c15b6",
                    "2cf8fdfa9e43d33357734276011824a0",
                    "f6812f1e7119d69cb4a429fa70182ccc",
                    "fe684377d80697154e301a503e1d9b53",
                    "c9f71de0aa30d48451771a587a0f7007",
                    "f998ccb6508dd98147561e3be53f5e4c",
                    "02d0efc85390dc6b48d777ecf8bb3d4a",
                    "ab3b768ba769aed6c7c3f6a29914d158",
                    "8e49300a2176751be58fc4d5e7b67cd7",
                    "6d2043bfc2cc762f071f6cb3d6cfebbd",
                    "4ca09aa3e220b93d5a29bc2f6ff2bd2a",
                    "d0d41a5d0277f77119806e7ed6dafd68",
                    "a7885fe0a2964f918a46e4b502227ca7",
                    "48511030865ae29d8df225e1e8d55644",
                    "d66eea96b89f4ea751c1970f7c7a2a58",
                    "71c63b63153cc04baf567f338836b9ed",
                    "cf724e52a4e9311f63ba6d2cad7aafaa",
                    "f071b23db727687957ea52cbc46e06c3",
                    "e40fa6b2c708d08246c048e3a6bdacef",
                    "a15cca6e62ab083cde3fb12a04e171a7",
                    "a9d013c279dbee7d2a562715adc3f6c8",
                    "ec49c852e6f31eedb332cc91ebe7ac90"
                ],
                "children" : [
                    {
                        "children_d" : [
                            "fe0cc6c3abb85023422421fcd6ed3446",
                            "d3cea25408e238e5143f34bc24e16ef5",
                            "33c573f5f1446718fb5d25fb47319b28",
                            "199a86a9ec2cd637adb0db6ab9977064",
                            "15532b48643a1c0bc91d46ce2e21b53f",
                            "6b8a4756ff926835765715057ae4d240",
                            "d7dd271b8a6b2a72d9ca975ff0b867ec",
                            "af1bd9c82d9a3a1352ea60db87193a7a",
                            "9e01641e6d6c85d62e98f4e9784640cf",
                            "f263673d4cb28a3bd2bd6b27a589d5c9",
                            "d92a30048a1114d4d6d3f0c1fc066b66",
                            "25e770d9fbca8d00b3347a04897b56a0",
                            "dfe2854d1b9909247a56372273fe749d",
                            "cca6c536ec85b86105b3013c1d5321cb",
                            "ec37d84ed96a03791c78127014605d84"
                        ],
                        "children" : [
                            {
                                "children_d" : [

                                ],
                                "children" : [

                                ],
                                "parents" : [
                                    "e40fa6b2c708d08246c048e3a6bdacef",
                                    "1",
                                    "#"
                                ],
                                "data" : null,
                                "state" : {

                                },
                                "a_attr" : {
                                    "href" : "#"
                                },
                                "li_attr" : {
                                    "id" : "fe0cc6c3abb85023422421fcd6ed3446"
                                },
                                "icon" : true,
                                "text" : "Cadastramento",
                                "id" : "fe0cc6c3abb85023422421fcd6ed3446"
                            },
                            {
                                "children_d" : [

                                ],
                                "children" : [

                                ],
                                "parents" : [
                                    "e40fa6b2c708d08246c048e3a6bdacef",
                                    "1",
                                    "#"
                                ],
                                "data" : null,
                                "state" : {

                                },
                                "a_attr" : {
                                    "href" : "#"
                                },
                                "li_attr" : {
                                    "id" : "d3cea25408e238e5143f34bc24e16ef5"
                                },
                                "icon" : true,
                                "text" : "Cadastramento com Sucesso",
                                "id" : "d3cea25408e238e5143f34bc24e16ef5"
                            },
                            {
                                "children_d" : [

                                ],
                                "children" : [

                                ],
                                "parents" : [
                                    "e40fa6b2c708d08246c048e3a6bdacef",
                                    "1",
                                    "#"
                                ],
                                "data" : null,
                                "state" : {

                                },
                                "a_attr" : {
                                    "href" : "#"
                                },
                                "li_attr" : {
                                    "id" : "33c573f5f1446718fb5d25fb47319b28"
                                },
                                "icon" : true,
                                "text" : "Editar Perfil Recrutador",
                                "id" : "33c573f5f1446718fb5d25fb47319b28"
                            },
                            {
                                "children_d" : [

                                ],
                                "children" : [

                                ],
                                "parents" : [
                                    "e40fa6b2c708d08246c048e3a6bdacef",
                                    "1",
                                    "#"
                                ],
                                "data" : null,
                                "state" : {

                                },
                                "a_attr" : {
                                    "href" : "#"
                                },
                                "li_attr" : {
                                    "id" : "199a86a9ec2cd637adb0db6ab9977064"
                                },
                                "icon" : true,
                                "text" : "Dados da Empresa",
                                "id" : "199a86a9ec2cd637adb0db6ab9977064"
                            },
                            {
                                "children_d" : [

                                ],
                                "children" : [

                                ],
                                "parents" : [
                                    "e40fa6b2c708d08246c048e3a6bdacef",
                                    "1",
                                    "#"
                                ],
                                "data" : null,
                                "state" : {

                                },
                                "a_attr" : {
                                    "href" : "#"
                                },
                                "li_attr" : {
                                    "id" : "15532b48643a1c0bc91d46ce2e21b53f"
                                },
                                "icon" : true,
                                "text" : "Criar Nova Vaga",
                                "id" : "15532b48643a1c0bc91d46ce2e21b53f"
                            },
                            {
                                "children_d" : [

                                ],
                                "children" : [

                                ],
                                "parents" : [
                                    "e40fa6b2c708d08246c048e3a6bdacef",
                                    "1",
                                    "#"
                                ],
                                "data" : null,
                                "state" : {

                                },
                                "a_attr" : {
                                    "href" : "#"
                                },
                                "li_attr" : {
                                    "id" : "6b8a4756ff926835765715057ae4d240"
                                },
                                "icon" : true,
                                "text" : "Minhas Vagas",
                                "id" : "6b8a4756ff926835765715057ae4d240"
                            },
                            {
                                "children_d" : [

                                ],
                                "children" : [

                                ],
                                "parents" : [
                                    "e40fa6b2c708d08246c048e3a6bdacef",
                                    "1",
                                    "#"
                                ],
                                "data" : null,
                                "state" : {

                                },
                                "a_attr" : {
                                    "href" : "#"
                                },
                                "li_attr" : {
                                    "id" : "d7dd271b8a6b2a72d9ca975ff0b867ec"
                                },
                                "icon" : true,
                                "text" : "Editar Vaga",
                                "id" : "d7dd271b8a6b2a72d9ca975ff0b867ec"
                            },
                            {
                                "children_d" : [

                                ],
                                "children" : [

                                ],
                                "parents" : [
                                    "e40fa6b2c708d08246c048e3a6bdacef",
                                    "1",
                                    "#"
                                ],
                                "data" : null,
                                "state" : {

                                },
                                "a_attr" : {
                                    "href" : "#"
                                },
                                "li_attr" : {
                                    "id" : "af1bd9c82d9a3a1352ea60db87193a7a"
                                },
                                "icon" : true,
                                "text" : "Buscar currículos",
                                "id" : "af1bd9c82d9a3a1352ea60db87193a7a"
                            },
                            {
                                "children_d" : [

                                ],
                                "children" : [

                                ],
                                "parents" : [
                                    "e40fa6b2c708d08246c048e3a6bdacef",
                                    "1",
                                    "#"
                                ],
                                "data" : null,
                                "state" : {

                                },
                                "a_attr" : {
                                    "href" : "#"
                                },
                                "li_attr" : {
                                    "id" : "9e01641e6d6c85d62e98f4e9784640cf"
                                },
                                "icon" : true,
                                "text" : "Visualizar Currículo",
                                "id" : "9e01641e6d6c85d62e98f4e9784640cf"
                            },
                            {
                                "children_d" : [

                                ],
                                "children" : [

                                ],
                                "parents" : [
                                    "e40fa6b2c708d08246c048e3a6bdacef",
                                    "1",
                                    "#"
                                ],
                                "data" : null,
                                "state" : {

                                },
                                "a_attr" : {
                                    "href" : "#"
                                },
                                "li_attr" : {
                                    "id" : "f263673d4cb28a3bd2bd6b27a589d5c9"
                                },
                                "icon" : true,
                                "text" : "Processo de Seleção",
                                "id" : "f263673d4cb28a3bd2bd6b27a589d5c9"
                            },
                            {
                                "children_d" : [

                                ],
                                "children" : [

                                ],
                                "parents" : [
                                    "e40fa6b2c708d08246c048e3a6bdacef",
                                    "1",
                                    "#"
                                ],
                                "data" : null,
                                "state" : {

                                },
                                "a_attr" : {
                                    "href" : "#"
                                },
                                "li_attr" : {
                                    "id" : "d92a30048a1114d4d6d3f0c1fc066b66"
                                },
                                "icon" : true,
                                "text" : "Currículo no Processo de Seleção",
                                "id" : "d92a30048a1114d4d6d3f0c1fc066b66"
                            },
                            {
                                "children_d" : [

                                ],
                                "children" : [

                                ],
                                "parents" : [
                                    "e40fa6b2c708d08246c048e3a6bdacef",
                                    "1",
                                    "#"
                                ],
                                "data" : null,
                                "state" : {

                                },
                                "a_attr" : {
                                    "href" : "#"
                                },
                                "li_attr" : {
                                    "id" : "25e770d9fbca8d00b3347a04897b56a0"
                                },
                                "icon" : true,
                                "text" : "Página da Empresa",
                                "id" : "25e770d9fbca8d00b3347a04897b56a0"
                            },
                            {
                                "children_d" : [

                                ],
                                "children" : [

                                ],
                                "parents" : [
                                    "e40fa6b2c708d08246c048e3a6bdacef",
                                    "1",
                                    "#"
                                ],
                                "data" : null,
                                "state" : {

                                },
                                "a_attr" : {
                                    "href" : "#"
                                },
                                "li_attr" : {
                                    "id" : "dfe2854d1b9909247a56372273fe749d"
                                },
                                "icon" : true,
                                "text" : "Configurar Página da Empresa",
                                "id" : "dfe2854d1b9909247a56372273fe749d"
                            },
                            {
                                "children_d" : [

                                ],
                                "children" : [

                                ],
                                "parents" : [
                                    "e40fa6b2c708d08246c048e3a6bdacef",
                                    "1",
                                    "#"
                                ],
                                "data" : null,
                                "state" : {

                                },
                                "a_attr" : {
                                    "href" : "#"
                                },
                                "li_attr" : {
                                    "id" : "cca6c536ec85b86105b3013c1d5321cb"
                                },
                                "icon" : true,
                                "text" : "Tornar-se Profissional",
                                "id" : "cca6c536ec85b86105b3013c1d5321cb"
                            },
                            {
                                "children_d" : [

                                ],
                                "children" : [

                                ],
                                "parents" : [
                                    "e40fa6b2c708d08246c048e3a6bdacef",
                                    "1",
                                    "#"
                                ],
                                "data" : null,
                                "state" : {

                                },
                                "a_attr" : {
                                    "href" : "#"
                                },
                                "li_attr" : {
                                    "id" : "ec37d84ed96a03791c78127014605d84"
                                },
                                "icon" : true,
                                "text" : "Deixar de Ser Recrutador",
                                "id" : "ec37d84ed96a03791c78127014605d84"
                            }
                        ],
                        "parents" : [
                            "1",
                            "#"
                        ],
                        "data" : null,
                        "state" : {

                        },
                        "a_attr" : {
                            "href" : "#"
                        },
                        "li_attr" : {
                            "id" : "e40fa6b2c708d08246c048e3a6bdacef"
                        },
                        "icon" : true,
                        "text" : "Recrutador",
                        "id" : "e40fa6b2c708d08246c048e3a6bdacef"
                    },
                    {
                        "children_d" : [
                            "0391b5d5f9b374854f042d016a697d55",
                            "7a5cecf0790dbafd269d60a00764a3d5",
                            "607a7c108cf6c5cdf4fa5fe0b82ea629",
                            "403968b638de3b50b92b26d4b5f5efa8",
                            "c992e37cce2f683c5c39dda9f5bf542c",
                            "94828b2107e9c5143ac8f4bba83e35ba",
                            "7069d6df62d608ff3d2ef2f0adfea2fa",
                            "4468f963069516fe2a1483fd39981f65",
                            "4cecdf078819bea8fb9a4082c569fdc5",
                            "34fbd0d689db3335408563ac8a29d453",
                            "b87abe0dd15c0cd94799938e5ec46d68",
                            "ee7cc57dc1db680baf38093ac5d50b47",
                            "e60ca50ff3d315f85ef4ac948a8dca8b",
                            "ba21c668394d487fc1192daf0e26f323",
                            "ced2debb7b85ee7fb98f3aaeb1abcf27",
                            "5780d6e232072191fce417bf3ee28841"
                        ],
                        "children" : [
                            {
                                "children_d" : [

                                ],
                                "children" : [

                                ],
                                "parents" : [
                                    "a15cca6e62ab083cde3fb12a04e171a7",
                                    "1",
                                    "#"
                                ],
                                "data" : null,
                                "state" : {

                                },
                                "a_attr" : {
                                    "href" : "#"
                                },
                                "li_attr" : {
                                    "id" : "0391b5d5f9b374854f042d016a697d55"
                                },
                                "icon" : true,
                                "text" : "Cadastramento",
                                "id" : "0391b5d5f9b374854f042d016a697d55"
                            },
                            {
                                "children_d" : [

                                ],
                                "children" : [

                                ],
                                "parents" : [
                                    "a15cca6e62ab083cde3fb12a04e171a7",
                                    "1",
                                    "#"
                                ],
                                "data" : null,
                                "state" : {

                                },
                                "a_attr" : {
                                    "href" : "#"
                                },
                                "li_attr" : {
                                    "id" : "7a5cecf0790dbafd269d60a00764a3d5"
                                },
                                "icon" : true,
                                "text" : "Cadastramento com Sucesso",
                                "id" : "7a5cecf0790dbafd269d60a00764a3d5"
                            },
                            {
                                "children_d" : [

                                ],
                                "children" : [

                                ],
                                "parents" : [
                                    "a15cca6e62ab083cde3fb12a04e171a7",
                                    "1",
                                    "#"
                                ],
                                "data" : null,
                                "state" : {

                                },
                                "a_attr" : {
                                    "href" : "#"
                                },
                                "li_attr" : {
                                    "id" : "607a7c108cf6c5cdf4fa5fe0b82ea629"
                                },
                                "icon" : true,
                                "text" : "Criar Novo Currículo",
                                "id" : "607a7c108cf6c5cdf4fa5fe0b82ea629"
                            },
                            {
                                "children_d" : [

                                ],
                                "children" : [

                                ],
                                "parents" : [
                                    "a15cca6e62ab083cde3fb12a04e171a7",
                                    "1",
                                    "#"
                                ],
                                "data" : null,
                                "state" : {

                                },
                                "a_attr" : {
                                    "href" : "#"
                                },
                                "li_attr" : {
                                    "id" : "403968b638de3b50b92b26d4b5f5efa8"
                                },
                                "icon" : true,
                                "text" : "Meus Currículos",
                                "id" : "403968b638de3b50b92b26d4b5f5efa8"
                            },
                            {
                                "children_d" : [

                                ],
                                "children" : [

                                ],
                                "parents" : [
                                    "a15cca6e62ab083cde3fb12a04e171a7",
                                    "1",
                                    "#"
                                ],
                                "data" : null,
                                "state" : {

                                },
                                "a_attr" : {
                                    "href" : "#"
                                },
                                "li_attr" : {
                                    "id" : "c992e37cce2f683c5c39dda9f5bf542c"
                                },
                                "icon" : true,
                                "text" : "Editar Currículo",
                                "id" : "c992e37cce2f683c5c39dda9f5bf542c"
                            },
                            {
                                "children_d" : [

                                ],
                                "children" : [

                                ],
                                "parents" : [
                                    "a15cca6e62ab083cde3fb12a04e171a7",
                                    "1",
                                    "#"
                                ],
                                "data" : null,
                                "state" : {

                                },
                                "a_attr" : {
                                    "href" : "#"
                                },
                                "li_attr" : {
                                    "id" : "94828b2107e9c5143ac8f4bba83e35ba"
                                },
                                "icon" : true,
                                "text" : "Criar Carta de Apresentação",
                                "id" : "94828b2107e9c5143ac8f4bba83e35ba"
                            },
                            {
                                "children_d" : [

                                ],
                                "children" : [

                                ],
                                "parents" : [
                                    "a15cca6e62ab083cde3fb12a04e171a7",
                                    "1",
                                    "#"
                                ],
                                "data" : null,
                                "state" : {

                                },
                                "a_attr" : {
                                    "href" : "#"
                                },
                                "li_attr" : {
                                    "id" : "7069d6df62d608ff3d2ef2f0adfea2fa"
                                },
                                "icon" : true,
                                "text" : "Minhas Cartas de Apresentação",
                                "id" : "7069d6df62d608ff3d2ef2f0adfea2fa"
                            },
                            {
                                "children_d" : [

                                ],
                                "children" : [

                                ],
                                "parents" : [
                                    "a15cca6e62ab083cde3fb12a04e171a7",
                                    "1",
                                    "#"
                                ],
                                "data" : null,
                                "state" : {

                                },
                                "a_attr" : {
                                    "href" : "#"
                                },
                                "li_attr" : {
                                    "id" : "4468f963069516fe2a1483fd39981f65"
                                },
                                "icon" : true,
                                "text" : "Editar Carta de Apresentação",
                                "id" : "4468f963069516fe2a1483fd39981f65"
                            },
                            {
                                "children_d" : [

                                ],
                                "children" : [

                                ],
                                "parents" : [
                                    "a15cca6e62ab083cde3fb12a04e171a7",
                                    "1",
                                    "#"
                                ],
                                "data" : null,
                                "state" : {

                                },
                                "a_attr" : {
                                    "href" : "#"
                                },
                                "li_attr" : {
                                    "id" : "4cecdf078819bea8fb9a4082c569fdc5"
                                },
                                "icon" : true,
                                "text" : "Visualizar Carta de Apresentação",
                                "id" : "4cecdf078819bea8fb9a4082c569fdc5"
                            },
                            {
                                "children_d" : [

                                ],
                                "children" : [

                                ],
                                "parents" : [
                                    "a15cca6e62ab083cde3fb12a04e171a7",
                                    "1",
                                    "#"
                                ],
                                "data" : null,
                                "state" : {

                                },
                                "a_attr" : {
                                    "href" : "#"
                                },
                                "li_attr" : {
                                    "id" : "34fbd0d689db3335408563ac8a29d453"
                                },
                                "icon" : true,
                                "text" : "Buscar Vagas",
                                "id" : "34fbd0d689db3335408563ac8a29d453"
                            },
                            {
                                "children_d" : [

                                ],
                                "children" : [

                                ],
                                "parents" : [
                                    "a15cca6e62ab083cde3fb12a04e171a7",
                                    "1",
                                    "#"
                                ],
                                "data" : null,
                                "state" : {

                                },
                                "a_attr" : {
                                    "href" : "#"
                                },
                                "li_attr" : {
                                    "id" : "b87abe0dd15c0cd94799938e5ec46d68"
                                },
                                "icon" : true,
                                "text" : "Cesta de Vagas",
                                "id" : "b87abe0dd15c0cd94799938e5ec46d68"
                            },
                            {
                                "children_d" : [

                                ],
                                "children" : [

                                ],
                                "parents" : [
                                    "a15cca6e62ab083cde3fb12a04e171a7",
                                    "1",
                                    "#"
                                ],
                                "data" : null,
                                "state" : {

                                },
                                "a_attr" : {
                                    "href" : "#"
                                },
                                "li_attr" : {
                                    "id" : "ee7cc57dc1db680baf38093ac5d50b47"
                                },
                                "icon" : true,
                                "text" : "Vagas Recomendadas",
                                "id" : "ee7cc57dc1db680baf38093ac5d50b47"
                            },
                            {
                                "children_d" : [

                                ],
                                "children" : [

                                ],
                                "parents" : [
                                    "a15cca6e62ab083cde3fb12a04e171a7",
                                    "1",
                                    "#"
                                ],
                                "data" : null,
                                "state" : {

                                },
                                "a_attr" : {
                                    "href" : "#"
                                },
                                "li_attr" : {
                                    "id" : "e60ca50ff3d315f85ef4ac948a8dca8b"
                                },
                                "icon" : true,
                                "text" : "Vagas Candidatadas",
                                "id" : "e60ca50ff3d315f85ef4ac948a8dca8b"
                            },
                            {
                                "children_d" : [

                                ],
                                "children" : [

                                ],
                                "parents" : [
                                    "a15cca6e62ab083cde3fb12a04e171a7",
                                    "1",
                                    "#"
                                ],
                                "data" : null,
                                "state" : {

                                },
                                "a_attr" : {
                                    "href" : "#"
                                },
                                "li_attr" : {
                                    "id" : "ba21c668394d487fc1192daf0e26f323"
                                },
                                "icon" : true,
                                "text" : "Candidatar-se a uma Vaga",
                                "id" : "ba21c668394d487fc1192daf0e26f323"
                            },
                            {
                                "children_d" : [

                                ],
                                "children" : [

                                ],
                                "parents" : [
                                    "a15cca6e62ab083cde3fb12a04e171a7",
                                    "1",
                                    "#"
                                ],
                                "data" : null,
                                "state" : {

                                },
                                "a_attr" : {
                                    "href" : "#"
                                },
                                "li_attr" : {
                                    "id" : "ced2debb7b85ee7fb98f3aaeb1abcf27"
                                },
                                "icon" : true,
                                "text" : "Imprimir Currículos",
                                "id" : "ced2debb7b85ee7fb98f3aaeb1abcf27"
                            },
                            {
                                "children_d" : [

                                ],
                                "children" : [

                                ],
                                "parents" : [
                                    "a15cca6e62ab083cde3fb12a04e171a7",
                                    "1",
                                    "#"
                                ],
                                "data" : null,
                                "state" : {

                                },
                                "a_attr" : {
                                    "href" : "#"
                                },
                                "li_attr" : {
                                    "id" : "5780d6e232072191fce417bf3ee28841"
                                },
                                "icon" : true,
                                "text" : "Tornar-se Recrutador",
                                "id" : "5780d6e232072191fce417bf3ee28841"
                            }
                        ],
                        "parents" : [
                            "1",
                            "#"
                        ],
                        "data" : null,
                        "state" : {

                        },
                        "a_attr" : {
                            "href" : "#"
                        },
                        "li_attr" : {
                            "id" : "a15cca6e62ab083cde3fb12a04e171a7"
                        },
                        "icon" : true,
                        "text" : "Profissional",
                        "id" : "a15cca6e62ab083cde3fb12a04e171a7"
                    },
                    {
                        "children_d" : [
                            "cda21cbc4092fd55a2356fb742918f17",
                            "23d475cd87aaae427ad5ce4b19aa18ef",
                            "a79d33c98ce5f435625d54545b41b224",
                            "82b6371a3b4c9b293a11e2b4e264c319",
                            "8b2fcd729d00b648350e2f21114caef0",
                            "0b25aee33c1e4a214e44986fa0e186c1",
                            "0ebd078607e2acbb520de216db36487f",
                            "3e0514449b0fef556d70ca2ba5ce2d6c",
                            "a75d6da0184ad89b168042e5e20bc5d1",
                            "d1cc1a413420a7721eba692a877b8fed",
                            "338018ecf3c8ddbadd72c4049f42dca9",
                            "83b7e67b96548217d5a1bd465d16941c",
                            "f46041daadbd51f94ecaf765d63c15b6",
                            "2cf8fdfa9e43d33357734276011824a0",
                            "f6812f1e7119d69cb4a429fa70182ccc",
                            "fe684377d80697154e301a503e1d9b53",
                            "c9f71de0aa30d48451771a587a0f7007",
                            "f998ccb6508dd98147561e3be53f5e4c",
                            "02d0efc85390dc6b48d777ecf8bb3d4a",
                            "ab3b768ba769aed6c7c3f6a29914d158",
                            "8e49300a2176751be58fc4d5e7b67cd7",
                            "6d2043bfc2cc762f071f6cb3d6cfebbd"
                        ],
                        "children" : [
                            {
                                "children_d" : [

                                ],
                                "children" : [

                                ],
                                "parents" : [
                                    "a9d013c279dbee7d2a562715adc3f6c8",
                                    "1",
                                    "#"
                                ],
                                "data" : null,
                                "state" : {

                                },
                                "a_attr" : {
                                    "href" : "#"
                                },
                                "li_attr" : {
                                    "id" : "cda21cbc4092fd55a2356fb742918f17"
                                },
                                "icon" : true,
                                "text" : "Cadastramento",
                                "id" : "cda21cbc4092fd55a2356fb742918f17"
                            },
                            {
                                "children_d" : [

                                ],
                                "children" : [

                                ],
                                "parents" : [
                                    "a9d013c279dbee7d2a562715adc3f6c8",
                                    "1",
                                    "#"
                                ],
                                "data" : null,
                                "state" : {

                                },
                                "a_attr" : {
                                    "href" : "#"
                                },
                                "li_attr" : {
                                    "id" : "23d475cd87aaae427ad5ce4b19aa18ef"
                                },
                                "icon" : true,
                                "text" : "Cadastramento com Sucesso",
                                "id" : "23d475cd87aaae427ad5ce4b19aa18ef"
                            },
                            {
                                "children_d" : [

                                ],
                                "children" : [

                                ],
                                "parents" : [
                                    "a9d013c279dbee7d2a562715adc3f6c8",
                                    "1",
                                    "#"
                                ],
                                "data" : null,
                                "state" : {

                                },
                                "a_attr" : {
                                    "href" : "#"
                                },
                                "li_attr" : {
                                    "id" : "a79d33c98ce5f435625d54545b41b224"
                                },
                                "icon" : true,
                                "text" : "Criar Classificados",
                                "id" : "a79d33c98ce5f435625d54545b41b224"
                            },
                            {
                                "children_d" : [

                                ],
                                "children" : [

                                ],
                                "parents" : [
                                    "a9d013c279dbee7d2a562715adc3f6c8",
                                    "1",
                                    "#"
                                ],
                                "data" : null,
                                "state" : {

                                },
                                "a_attr" : {
                                    "href" : "#"
                                },
                                "li_attr" : {
                                    "id" : "82b6371a3b4c9b293a11e2b4e264c319"
                                },
                                "icon" : true,
                                "text" : "Editar Classificado",
                                "id" : "82b6371a3b4c9b293a11e2b4e264c319"
                            },
                            {
                                "children_d" : [

                                ],
                                "children" : [

                                ],
                                "parents" : [
                                    "a9d013c279dbee7d2a562715adc3f6c8",
                                    "1",
                                    "#"
                                ],
                                "data" : null,
                                "state" : {

                                },
                                "a_attr" : {
                                    "href" : "#"
                                },
                                "li_attr" : {
                                    "id" : "8b2fcd729d00b648350e2f21114caef0"
                                },
                                "icon" : true,
                                "text" : "Meus Classificados",
                                "id" : "8b2fcd729d00b648350e2f21114caef0"
                            },
                            {
                                "children_d" : [

                                ],
                                "children" : [

                                ],
                                "parents" : [
                                    "a9d013c279dbee7d2a562715adc3f6c8",
                                    "1",
                                    "#"
                                ],
                                "data" : null,
                                "state" : {

                                },
                                "a_attr" : {
                                    "href" : "#"
                                },
                                "li_attr" : {
                                    "id" : "0b25aee33c1e4a214e44986fa0e186c1"
                                },
                                "icon" : true,
                                "text" : "Buscar Classificados",
                                "id" : "0b25aee33c1e4a214e44986fa0e186c1"
                            },
                            {
                                "children_d" : [

                                ],
                                "children" : [

                                ],
                                "parents" : [
                                    "a9d013c279dbee7d2a562715adc3f6c8",
                                    "1",
                                    "#"
                                ],
                                "data" : null,
                                "state" : {

                                },
                                "a_attr" : {
                                    "href" : "#"
                                },
                                "li_attr" : {
                                    "id" : "0ebd078607e2acbb520de216db36487f"
                                },
                                "icon" : true,
                                "text" : "Visualizar Classificado",
                                "id" : "0ebd078607e2acbb520de216db36487f"
                            },
                            {
                                "children_d" : [

                                ],
                                "children" : [

                                ],
                                "parents" : [
                                    "a9d013c279dbee7d2a562715adc3f6c8",
                                    "1",
                                    "#"
                                ],
                                "data" : null,
                                "state" : {

                                },
                                "a_attr" : {
                                    "href" : "#"
                                },
                                "li_attr" : {
                                    "id" : "3e0514449b0fef556d70ca2ba5ce2d6c"
                                },
                                "icon" : true,
                                "text" : "Perfil Social",
                                "id" : "3e0514449b0fef556d70ca2ba5ce2d6c"
                            },
                            {
                                "children_d" : [

                                ],
                                "children" : [

                                ],
                                "parents" : [
                                    "a9d013c279dbee7d2a562715adc3f6c8",
                                    "1",
                                    "#"
                                ],
                                "data" : null,
                                "state" : {

                                },
                                "a_attr" : {
                                    "href" : "#"
                                },
                                "li_attr" : {
                                    "id" : "a75d6da0184ad89b168042e5e20bc5d1"
                                },
                                "icon" : true,
                                "text" : "Contatos",
                                "id" : "a75d6da0184ad89b168042e5e20bc5d1"
                            },
                            {
                                "children_d" : [

                                ],
                                "children" : [

                                ],
                                "parents" : [
                                    "a9d013c279dbee7d2a562715adc3f6c8",
                                    "1",
                                    "#"
                                ],
                                "data" : null,
                                "state" : {

                                },
                                "a_attr" : {
                                    "href" : "#"
                                },
                                "li_attr" : {
                                    "id" : "d1cc1a413420a7721eba692a877b8fed"
                                },
                                "icon" : true,
                                "text" : "Buscar Contatos",
                                "id" : "d1cc1a413420a7721eba692a877b8fed"
                            },
                            {
                                "children_d" : [

                                ],
                                "children" : [

                                ],
                                "parents" : [
                                    "a9d013c279dbee7d2a562715adc3f6c8",
                                    "1",
                                    "#"
                                ],
                                "data" : null,
                                "state" : {

                                },
                                "a_attr" : {
                                    "href" : "#"
                                },
                                "li_attr" : {
                                    "id" : "338018ecf3c8ddbadd72c4049f42dca9"
                                },
                                "icon" : true,
                                "text" : "Gerenciar Recomendações",
                                "id" : "338018ecf3c8ddbadd72c4049f42dca9"
                            },
                            {
                                "children_d" : [

                                ],
                                "children" : [

                                ],
                                "parents" : [
                                    "a9d013c279dbee7d2a562715adc3f6c8",
                                    "1",
                                    "#"
                                ],
                                "data" : null,
                                "state" : {

                                },
                                "a_attr" : {
                                    "href" : "#"
                                },
                                "li_attr" : {
                                    "id" : "83b7e67b96548217d5a1bd465d16941c"
                                },
                                "icon" : true,
                                "text" : "Criar Grupo",
                                "id" : "83b7e67b96548217d5a1bd465d16941c"
                            },
                            {
                                "children_d" : [

                                ],
                                "children" : [

                                ],
                                "parents" : [
                                    "a9d013c279dbee7d2a562715adc3f6c8",
                                    "1",
                                    "#"
                                ],
                                "data" : null,
                                "state" : {

                                },
                                "a_attr" : {
                                    "href" : "#"
                                },
                                "li_attr" : {
                                    "id" : "f46041daadbd51f94ecaf765d63c15b6"
                                },
                                "icon" : true,
                                "text" : "Meus Grupos",
                                "id" : "f46041daadbd51f94ecaf765d63c15b6"
                            },
                            {
                                "children_d" : [

                                ],
                                "children" : [

                                ],
                                "parents" : [
                                    "a9d013c279dbee7d2a562715adc3f6c8",
                                    "1",
                                    "#"
                                ],
                                "data" : null,
                                "state" : {

                                },
                                "a_attr" : {
                                    "href" : "#"
                                },
                                "li_attr" : {
                                    "id" : "2cf8fdfa9e43d33357734276011824a0"
                                },
                                "icon" : true,
                                "text" : "Editar Grupo",
                                "id" : "2cf8fdfa9e43d33357734276011824a0"
                            },
                            {
                                "children_d" : [

                                ],
                                "children" : [

                                ],
                                "parents" : [
                                    "a9d013c279dbee7d2a562715adc3f6c8",
                                    "1",
                                    "#"
                                ],
                                "data" : null,
                                "state" : {

                                },
                                "a_attr" : {
                                    "href" : "#"
                                },
                                "li_attr" : {
                                    "id" : "f6812f1e7119d69cb4a429fa70182ccc"
                                },
                                "icon" : true,
                                "text" : "Buscar Grupos",
                                "id" : "f6812f1e7119d69cb4a429fa70182ccc"
                            },
                            {
                                "children_d" : [

                                ],
                                "children" : [

                                ],
                                "parents" : [
                                    "a9d013c279dbee7d2a562715adc3f6c8",
                                    "1",
                                    "#"
                                ],
                                "data" : null,
                                "state" : {

                                },
                                "a_attr" : {
                                    "href" : "#"
                                },
                                "li_attr" : {
                                    "id" : "fe684377d80697154e301a503e1d9b53"
                                },
                                "icon" : true,
                                "text" : "Perfil do Grupo",
                                "id" : "fe684377d80697154e301a503e1d9b53"
                            },
                            {
                                "children_d" : [

                                ],
                                "children" : [

                                ],
                                "parents" : [
                                    "a9d013c279dbee7d2a562715adc3f6c8",
                                    "1",
                                    "#"
                                ],
                                "data" : null,
                                "state" : {

                                },
                                "a_attr" : {
                                    "href" : "#"
                                },
                                "li_attr" : {
                                    "id" : "c9f71de0aa30d48451771a587a0f7007"
                                },
                                "icon" : true,
                                "text" : "Criar Tópico",
                                "id" : "c9f71de0aa30d48451771a587a0f7007"
                            },
                            {
                                "children_d" : [

                                ],
                                "children" : [

                                ],
                                "parents" : [
                                    "a9d013c279dbee7d2a562715adc3f6c8",
                                    "1",
                                    "#"
                                ],
                                "data" : null,
                                "state" : {

                                },
                                "a_attr" : {
                                    "href" : "#"
                                },
                                "li_attr" : {
                                    "id" : "f998ccb6508dd98147561e3be53f5e4c"
                                },
                                "icon" : true,
                                "text" : "Visualizar Tópico",
                                "id" : "f998ccb6508dd98147561e3be53f5e4c"
                            },
                            {
                                "children_d" : [

                                ],
                                "children" : [

                                ],
                                "parents" : [
                                    "a9d013c279dbee7d2a562715adc3f6c8",
                                    "1",
                                    "#"
                                ],
                                "data" : null,
                                "state" : {

                                },
                                "a_attr" : {
                                    "href" : "#"
                                },
                                "li_attr" : {
                                    "id" : "02d0efc85390dc6b48d777ecf8bb3d4a"
                                },
                                "icon" : true,
                                "text" : "Editar Tópico",
                                "id" : "02d0efc85390dc6b48d777ecf8bb3d4a"
                            },
                            {
                                "children_d" : [

                                ],
                                "children" : [

                                ],
                                "parents" : [
                                    "a9d013c279dbee7d2a562715adc3f6c8",
                                    "1",
                                    "#"
                                ],
                                "data" : null,
                                "state" : {

                                },
                                "a_attr" : {
                                    "href" : "#"
                                },
                                "li_attr" : {
                                    "id" : "ab3b768ba769aed6c7c3f6a29914d158"
                                },
                                "icon" : true,
                                "text" : "Perfil da Empresa",
                                "id" : "ab3b768ba769aed6c7c3f6a29914d158"
                            },
                            {
                                "children_d" : [

                                ],
                                "children" : [

                                ],
                                "parents" : [
                                    "a9d013c279dbee7d2a562715adc3f6c8",
                                    "1",
                                    "#"
                                ],
                                "data" : null,
                                "state" : {

                                },
                                "a_attr" : {
                                    "href" : "#"
                                },
                                "li_attr" : {
                                    "id" : "8e49300a2176751be58fc4d5e7b67cd7"
                                },
                                "icon" : true,
                                "text" : "Buscar Empresas",
                                "id" : "8e49300a2176751be58fc4d5e7b67cd7"
                            },
                            {
                                "children_d" : [

                                ],
                                "children" : [

                                ],
                                "parents" : [
                                    "a9d013c279dbee7d2a562715adc3f6c8",
                                    "1",
                                    "#"
                                ],
                                "data" : null,
                                "state" : {

                                },
                                "a_attr" : {
                                    "href" : "#"
                                },
                                "li_attr" : {
                                    "id" : "6d2043bfc2cc762f071f6cb3d6cfebbd"
                                },
                                "icon" : true,
                                "text" : "Gerenciar Conexões - Empresa",
                                "id" : "6d2043bfc2cc762f071f6cb3d6cfebbd"
                            }
                        ],
                        "parents" : [
                            "1",
                            "#"
                        ],
                        "data" : null,
                        "state" : {

                        },
                        "a_attr" : {
                            "href" : "#"
                        },
                        "li_attr" : {
                            "id" : "a9d013c279dbee7d2a562715adc3f6c8"
                        },
                        "icon" : true,
                        "text" : "+emprego.net",
                        "id" : "a9d013c279dbee7d2a562715adc3f6c8"
                    },
                    {
                        "children_d" : [
                            "4ca09aa3e220b93d5a29bc2f6ff2bd2a",
                            "d0d41a5d0277f77119806e7ed6dafd68",
                            "a7885fe0a2964f918a46e4b502227ca7",
                            "48511030865ae29d8df225e1e8d55644",
                            "d66eea96b89f4ea751c1970f7c7a2a58",
                            "71c63b63153cc04baf567f338836b9ed",
                            "cf724e52a4e9311f63ba6d2cad7aafaa",
                            "f071b23db727687957ea52cbc46e06c3"
                        ],
                        "children" : [
                            {
                                "children_d" : [

                                ],
                                "children" : [

                                ],
                                "parents" : [
                                    "ec49c852e6f31eedb332cc91ebe7ac90",
                                    "1",
                                    "#"
                                ],
                                "data" : null,
                                "state" : {

                                },
                                "a_attr" : {
                                    "href" : "#"
                                },
                                "li_attr" : {
                                    "id" : "4ca09aa3e220b93d5a29bc2f6ff2bd2a"
                                },
                                "icon" : true,
                                "text" : "Editar Perfil",
                                "id" : "4ca09aa3e220b93d5a29bc2f6ff2bd2a"
                            },
                            {
                                "children_d" : [

                                ],
                                "children" : [

                                ],
                                "parents" : [
                                    "ec49c852e6f31eedb332cc91ebe7ac90",
                                    "1",
                                    "#"
                                ],
                                "data" : null,
                                "state" : {

                                },
                                "a_attr" : {
                                    "href" : "#"
                                },
                                "li_attr" : {
                                    "id" : "d0d41a5d0277f77119806e7ed6dafd68"
                                },
                                "icon" : true,
                                "text" : "Mensagens",
                                "id" : "d0d41a5d0277f77119806e7ed6dafd68"
                            },
                            {
                                "children_d" : [

                                ],
                                "children" : [

                                ],
                                "parents" : [
                                    "ec49c852e6f31eedb332cc91ebe7ac90",
                                    "1",
                                    "#"
                                ],
                                "data" : null,
                                "state" : {

                                },
                                "a_attr" : {
                                    "href" : "#"
                                },
                                "li_attr" : {
                                    "id" : "a7885fe0a2964f918a46e4b502227ca7"
                                },
                                "icon" : true,
                                "text" : "Agenda",
                                "id" : "a7885fe0a2964f918a46e4b502227ca7"
                            },
                            {
                                "children_d" : [

                                ],
                                "children" : [

                                ],
                                "parents" : [
                                    "ec49c852e6f31eedb332cc91ebe7ac90",
                                    "1",
                                    "#"
                                ],
                                "data" : null,
                                "state" : {

                                },
                                "a_attr" : {
                                    "href" : "#"
                                },
                                "li_attr" : {
                                    "id" : "48511030865ae29d8df225e1e8d55644"
                                },
                                "icon" : true,
                                "text" : "Página de Login",
                                "id" : "48511030865ae29d8df225e1e8d55644"
                            },
                            {
                                "children_d" : [

                                ],
                                "children" : [

                                ],
                                "parents" : [
                                    "ec49c852e6f31eedb332cc91ebe7ac90",
                                    "1",
                                    "#"
                                ],
                                "data" : null,
                                "state" : {

                                },
                                "a_attr" : {
                                    "href" : "#"
                                },
                                "li_attr" : {
                                    "id" : "d66eea96b89f4ea751c1970f7c7a2a58"
                                },
                                "icon" : true,
                                "text" : "Esqueci Minha Senha",
                                "id" : "d66eea96b89f4ea751c1970f7c7a2a58"
                            },
                            {
                                "children_d" : [

                                ],
                                "children" : [

                                ],
                                "parents" : [
                                    "ec49c852e6f31eedb332cc91ebe7ac90",
                                    "1",
                                    "#"
                                ],
                                "data" : null,
                                "state" : {

                                },
                                "a_attr" : {
                                    "href" : "#"
                                },
                                "li_attr" : {
                                    "id" : "71c63b63153cc04baf567f338836b9ed"
                                },
                                "icon" : true,
                                "text" : "Recuperar Login e Senha",
                                "id" : "71c63b63153cc04baf567f338836b9ed"
                            },
                            {
                                "children_d" : [

                                ],
                                "children" : [

                                ],
                                "parents" : [
                                    "ec49c852e6f31eedb332cc91ebe7ac90",
                                    "1",
                                    "#"
                                ],
                                "data" : null,
                                "state" : {

                                },
                                "a_attr" : {
                                    "href" : "#"
                                },
                                "li_attr" : {
                                    "id" : "cf724e52a4e9311f63ba6d2cad7aafaa"
                                },
                                "icon" : true,
                                "text" : "Lista de  Ícones",
                                "id" : "cf724e52a4e9311f63ba6d2cad7aafaa"
                            },
                            {
                                "children_d" : [

                                ],
                                "children" : [

                                ],
                                "parents" : [
                                    "ec49c852e6f31eedb332cc91ebe7ac90",
                                    "1",
                                    "#"
                                ],
                                "data" : null,
                                "state" : {

                                },
                                "a_attr" : {
                                    "href" : "#"
                                },
                                "li_attr" : {
                                    "id" : "f071b23db727687957ea52cbc46e06c3"
                                },
                                "icon" : true,
                                "text" : "Ajuda",
                                "id" : "f071b23db727687957ea52cbc46e06c3"
                            }
                        ],
                        "parents" : [
                            "1",
                            "#"
                        ],
                        "data" : null,
                        "state" : {

                        },
                        "a_attr" : {
                            "href" : "#"
                        },
                        "li_attr" : {
                            "id" : "ec49c852e6f31eedb332cc91ebe7ac90"
                        },
                        "icon" : true,
                        "text" : "Geral",
                        "id" : "ec49c852e6f31eedb332cc91ebe7ac90"
                    }
                ],
                "parents" : [
                    "#"
                ],
                "data" : null,
                "state" : {

                },
                "a_attr" : {
                    "href" : "#"
                },
                "li_attr" : {
                    "id" : "1"
                },
                "icon" : true,
                "text" : "Ajuda",
                "id" : "1"
            },
            {
                "children_d" : [
                    "8c6ef6d9de6027333d5493c2db9b5bed",
                    "e268cf7c411ca97601dd2efdf962b93b"
                ],
                "children" : [
                    {
                        "children_d" : [
                            "8c6ef6d9de6027333d5493c2db9b5bed"
                        ],
                        "children" : [
                            {
                                "children_d" : [

                                ],
                                "children" : [

                                ],
                                "parents" : [
                                    "e268cf7c411ca97601dd2efdf962b93b",
                                    "2",
                                    "#"
                                ],
                                "data" : null,
                                "state" : {

                                },
                                "a_attr" : {
                                    "href" : "#"
                                },
                                "li_attr" : {
                                    "id" : "8c6ef6d9de6027333d5493c2db9b5bed"
                                },
                                "icon" : true,
                                "text" : "sub pag",
                                "id" : "8c6ef6d9de6027333d5493c2db9b5bed"
                            }
                        ],
                        "parents" : [
                            "2",
                            "#"
                        ],
                        "data" : null,
                        "state" : {

                        },
                        "a_attr" : {
                            "href" : "#"
                        },
                        "li_attr" : {
                            "id" : "e268cf7c411ca97601dd2efdf962b93b"
                        },
                        "icon" : true,
                        "text" : "pag",
                        "id" : "e268cf7c411ca97601dd2efdf962b93b"
                    }
                ],
                "parents" : [
                    "#"
                ],
                "data" : null,
                "state" : {

                },
                "a_attr" : {
                    "href" : "#"
                },
                "li_attr" : {
                    "id" : "2"
                },
                "icon" : true,
                "text" : "Páginas",
                "id" : "2"
            },
            {
                "children_d" : [
                    "0d0ac8af96f14045a73bcc46ff26705a",
                    "c37f688e3650e1777e3b7038306add74",
                    "9e18bf0fb9c3ad28e7f3785ad0c62694",
                    "e81224f80aad10dc6a562949014f7372",
                    "d250fd18c8bb326c46e426738a5796af",
                    "a89d9ada519da2aadf2ba9a548be714b",
                    "e640040670792df852548aa562790581",
                    "24700109ed92829bbbf825628c8bd817",
                    "cffd1cae59ec8e6bbc9d2a320f89edad",
                    "51da8d553707f20ff006dfc320cf15d3",
                    "4912cc42c761abb432cbbbcb83146af0",
                    "e93555c728aa1d0c2885bbf5face75d2",
                    "0ec62b694fef9b699fa90e38970a51f0",
                    "d3b58a2b82524598aaeed995f41dc6a7",
                    "3571c29663bc247d9a2ca8d80cd4d768",
                    "89bd1deb37603f3b2225254dd3072ecf",
                    "f4904b1447db562b383e6e4558b5062a",
                    "f0d7fb4076dab2aade5e9b892fecda92"
                ],
                "children" : [
                    {
                        "children_d" : [
                            "0d0ac8af96f14045a73bcc46ff26705a",
                            "c37f688e3650e1777e3b7038306add74",
                            "9e18bf0fb9c3ad28e7f3785ad0c62694",
                            "e81224f80aad10dc6a562949014f7372",
                            "d250fd18c8bb326c46e426738a5796af",
                            "a89d9ada519da2aadf2ba9a548be714b",
                            "e640040670792df852548aa562790581",
                            "24700109ed92829bbbf825628c8bd817"
                        ],
                        "children" : [
                            {
                                "children_d" : [
                                    "0d0ac8af96f14045a73bcc46ff26705a",
                                    "c37f688e3650e1777e3b7038306add74",
                                    "9e18bf0fb9c3ad28e7f3785ad0c62694",
                                    "e81224f80aad10dc6a562949014f7372",
                                    "d250fd18c8bb326c46e426738a5796af",
                                    "a89d9ada519da2aadf2ba9a548be714b",
                                    "e640040670792df852548aa562790581"
                                ],
                                "children" : [
                                    {
                                        "children_d" : [

                                        ],
                                        "children" : [

                                        ],
                                        "parents" : [
                                            "24700109ed92829bbbf825628c8bd817",
                                            "d3b58a2b82524598aaeed995f41dc6a7",
                                            "3",
                                            "#"
                                        ],
                                        "data" : null,
                                        "state" : {

                                        },
                                        "a_attr" : {
                                            "href" : "#"
                                        },
                                        "li_attr" : {
                                            "id" : "0d0ac8af96f14045a73bcc46ff26705a"
                                        },
                                        "icon" : true,
                                        "text" : "Armários e guarda-roupas",
                                        "id" : "0d0ac8af96f14045a73bcc46ff26705a"
                                    },
                                    {
                                        "children_d" : [

                                        ],
                                        "children" : [

                                        ],
                                        "parents" : [
                                            "24700109ed92829bbbf825628c8bd817",
                                            "d3b58a2b82524598aaeed995f41dc6a7",
                                            "3",
                                            "#"
                                        ],
                                        "data" : null,
                                        "state" : {

                                        },
                                        "a_attr" : {
                                            "href" : "#"
                                        },
                                        "li_attr" : {
                                            "id" : "c37f688e3650e1777e3b7038306add74"
                                        },
                                        "icon" : true,
                                        "text" : "Camas e colchões",
                                        "id" : "c37f688e3650e1777e3b7038306add74"
                                    },
                                    {
                                        "children_d" : [

                                        ],
                                        "children" : [

                                        ],
                                        "parents" : [
                                            "24700109ed92829bbbf825628c8bd817",
                                            "d3b58a2b82524598aaeed995f41dc6a7",
                                            "3",
                                            "#"
                                        ],
                                        "data" : null,
                                        "state" : {

                                        },
                                        "a_attr" : {
                                            "href" : "#"
                                        },
                                        "li_attr" : {
                                            "id" : "9e18bf0fb9c3ad28e7f3785ad0c62694"
                                        },
                                        "icon" : true,
                                        "text" : "Estantes",
                                        "id" : "9e18bf0fb9c3ad28e7f3785ad0c62694"
                                    },
                                    {
                                        "children_d" : [

                                        ],
                                        "children" : [

                                        ],
                                        "parents" : [
                                            "24700109ed92829bbbf825628c8bd817",
                                            "d3b58a2b82524598aaeed995f41dc6a7",
                                            "3",
                                            "#"
                                        ],
                                        "data" : null,
                                        "state" : {

                                        },
                                        "a_attr" : {
                                            "href" : "#"
                                        },
                                        "li_attr" : {
                                            "id" : "e81224f80aad10dc6a562949014f7372"
                                        },
                                        "icon" : true,
                                        "text" : "Mesas e cadeiras",
                                        "id" : "e81224f80aad10dc6a562949014f7372"
                                    },
                                    {
                                        "children_d" : [

                                        ],
                                        "children" : [

                                        ],
                                        "parents" : [
                                            "24700109ed92829bbbf825628c8bd817",
                                            "d3b58a2b82524598aaeed995f41dc6a7",
                                            "3",
                                            "#"
                                        ],
                                        "data" : null,
                                        "state" : {

                                        },
                                        "a_attr" : {
                                            "href" : "#"
                                        },
                                        "li_attr" : {
                                            "id" : "d250fd18c8bb326c46e426738a5796af"
                                        },
                                        "icon" : true,
                                        "text" : "Sofás e poltronas",
                                        "id" : "d250fd18c8bb326c46e426738a5796af"
                                    },
                                    {
                                        "children_d" : [

                                        ],
                                        "children" : [

                                        ],
                                        "parents" : [
                                            "24700109ed92829bbbf825628c8bd817",
                                            "d3b58a2b82524598aaeed995f41dc6a7",
                                            "3",
                                            "#"
                                        ],
                                        "data" : null,
                                        "state" : {

                                        },
                                        "a_attr" : {
                                            "href" : "#"
                                        },
                                        "li_attr" : {
                                            "id" : "a89d9ada519da2aadf2ba9a548be714b"
                                        },
                                        "icon" : true,
                                        "text" : "Racks",
                                        "id" : "a89d9ada519da2aadf2ba9a548be714b"
                                    },
                                    {
                                        "children_d" : [

                                        ],
                                        "children" : [

                                        ],
                                        "parents" : [
                                            "24700109ed92829bbbf825628c8bd817",
                                            "d3b58a2b82524598aaeed995f41dc6a7",
                                            "3",
                                            "#"
                                        ],
                                        "data" : null,
                                        "state" : {

                                        },
                                        "a_attr" : {
                                            "href" : "#"
                                        },
                                        "li_attr" : {
                                            "id" : "e640040670792df852548aa562790581"
                                        },
                                        "icon" : true,
                                        "text" : "Outros",
                                        "id" : "e640040670792df852548aa562790581"
                                    }
                                ],
                                "parents" : [
                                    "d3b58a2b82524598aaeed995f41dc6a7",
                                    "3",
                                    "#"
                                ],
                                "data" : null,
                                "state" : {

                                },
                                "a_attr" : {
                                    "href" : "#"
                                },
                                "li_attr" : {
                                    "id" : "24700109ed92829bbbf825628c8bd817"
                                },
                                "icon" : true,
                                "text" : "Móveis",
                                "id" : "24700109ed92829bbbf825628c8bd817"
                            }
                        ],
                        "parents" : [
                            "3",
                            "#"
                        ],
                        "data" : null,
                        "state" : {

                        },
                        "a_attr" : {
                            "href" : "#"
                        },
                        "li_attr" : {
                            "id" : "d3b58a2b82524598aaeed995f41dc6a7"
                        },
                        "icon" : true,
                        "text" : "Para a sua casa",
                        "id" : "d3b58a2b82524598aaeed995f41dc6a7"
                    },
                    {
                        "children_d" : [
                            "cffd1cae59ec8e6bbc9d2a320f89edad",
                            "51da8d553707f20ff006dfc320cf15d3",
                            "4912cc42c761abb432cbbbcb83146af0"
                        ],
                        "children" : [
                            {
                                "children_d" : [

                                ],
                                "children" : [

                                ],
                                "parents" : [
                                    "3571c29663bc247d9a2ca8d80cd4d768",
                                    "3",
                                    "#"
                                ],
                                "data" : {
                                    "approval" : true
                                },
                                "state" : {

                                },
                                "a_attr" : {
                                    "href" : "#"
                                },
                                "li_attr" : {
                                    "id" : "cffd1cae59ec8e6bbc9d2a320f89edad"
                                },
                                "icon" : true,
                                "text" : "Escritório* Editado.",
                                "id" : "cffd1cae59ec8e6bbc9d2a320f89edad"
                            },
                            {
                                "children_d" : [

                                ],
                                "children" : [

                                ],
                                "parents" : [
                                    "3571c29663bc247d9a2ca8d80cd4d768",
                                    "3",
                                    "#"
                                ],
                                "data" : {
                                    "fields" : [
                                        {
                                            "required" : true,
                                            "name" : "newOrUsed"
                                        }
                                    ]
                                },
                                "state" : {

                                },
                                "a_attr" : {
                                    "href" : "#"
                                },
                                "li_attr" : {
                                    "id" : "51da8d553707f20ff006dfc320cf15d3"
                                },
                                "icon" : true,
                                "text" : "iPhone Apple",
                                "id" : "51da8d553707f20ff006dfc320cf15d3"
                            },
                            {
                                "children_d" : [

                                ],
                                "children" : [

                                ],
                                "parents" : [
                                    "3571c29663bc247d9a2ca8d80cd4d768",
                                    "3",
                                    "#"
                                ],
                                "data" : {
                                    "fields" : [
                                        "newOrUsed"
                                    ]
                                },
                                "state" : {

                                },
                                "a_attr" : {
                                    "href" : "#"
                                },
                                "li_attr" : {
                                    "id" : "4912cc42c761abb432cbbbcb83146af0"
                                },
                                "icon" : true,
                                "text" : "Samsung",
                                "id" : "4912cc42c761abb432cbbbcb83146af0"
                            }
                        ],
                        "parents" : [
                            "3",
                            "#"
                        ],
                        "data" : null,
                        "state" : {

                        },
                        "a_attr" : {
                            "href" : "#"
                        },
                        "li_attr" : {
                            "id" : "3571c29663bc247d9a2ca8d80cd4d768"
                        },
                        "icon" : true,
                        "text" : "Eletrônicos e celulares",
                        "id" : "3571c29663bc247d9a2ca8d80cd4d768"
                    },
                    {
                        "children_d" : [
                            "e93555c728aa1d0c2885bbf5face75d2"
                        ],
                        "children" : [
                            {
                                "children_d" : [

                                ],
                                "children" : [

                                ],
                                "parents" : [
                                    "89bd1deb37603f3b2225254dd3072ecf",
                                    "3",
                                    "#"
                                ],
                                "data" : null,
                                "state" : {

                                },
                                "a_attr" : {
                                    "href" : "#"
                                },
                                "li_attr" : {
                                    "id" : "e93555c728aa1d0c2885bbf5face75d2"
                                },
                                "icon" : true,
                                "text" : "SubCategoria 2 1DT - Nivel 1",
                                "id" : "e93555c728aa1d0c2885bbf5face75d2"
                            }
                        ],
                        "parents" : [
                            "3",
                            "#"
                        ],
                        "data" : null,
                        "state" : {

                        },
                        "a_attr" : {
                            "href" : "#"
                        },
                        "li_attr" : {
                            "id" : "89bd1deb37603f3b2225254dd3072ecf"
                        },
                        "icon" : true,
                        "text" : "Categoria 1DT Editada",
                        "id" : "89bd1deb37603f3b2225254dd3072ecf"
                    },
                    {
                        "children_d" : [

                        ],
                        "children" : [

                        ],
                        "parents" : [
                            "3",
                            "#"
                        ],
                        "data" : {
                            "approval" : true
                        },
                        "state" : {

                        },
                        "a_attr" : {
                            "href" : "#"
                        },
                        "li_attr" : {
                            "id" : "f4904b1447db562b383e6e4558b5062a"
                        },
                        "icon" : true,
                        "text" : "Categoria 1DT - Com aprovação",
                        "id" : "f4904b1447db562b383e6e4558b5062a"
                    },
                    {
                        "children_d" : [
                            "0ec62b694fef9b699fa90e38970a51f0"
                        ],
                        "children" : [
                            {
                                "children_d" : [

                                ],
                                "children" : [

                                ],
                                "parents" : [
                                    "f0d7fb4076dab2aade5e9b892fecda92",
                                    "3",
                                    "#"
                                ],
                                "data" : null,
                                "state" : {

                                },
                                "a_attr" : {
                                    "href" : "#"
                                },
                                "li_attr" : {
                                    "id" : "0ec62b694fef9b699fa90e38970a51f0"
                                },
                                "icon" : true,
                                "text" : "Subcategoria 1DT - Com aprovação 2 - Nível 1",
                                "id" : "0ec62b694fef9b699fa90e38970a51f0"
                            }
                        ],
                        "parents" : [
                            "3",
                            "#"
                        ],
                        "data" : {
                            "approval" : true
                        },
                        "state" : {

                        },
                        "a_attr" : {
                            "href" : "#"
                        },
                        "li_attr" : {
                            "id" : "f0d7fb4076dab2aade5e9b892fecda92"
                        },
                        "icon" : true,
                        "text" : "Categoria 1DT - Com aprovação 2",
                        "id" : "f0d7fb4076dab2aade5e9b892fecda92"
                    }
                ],
                "parents" : [
                    "#"
                ],
                "data" : null,
                "state" : {

                },
                "a_attr" : {
                    "href" : "#"
                },
                "li_attr" : {
                    "id" : "3"
                },
                "icon" : true,
                "text" : "Classificados",
                "id" : "3"
            },
            {
                "children_d" : [
                    "7b61ac2537d7f7be77006628f5ed95f0",
                    "ec6c2b7b91e55a5c23ab2e5676c4acf7",
                    "56331a638041e93075e859d784d296f3",
                    "a9b585362fe4109e651117e09e0ec495",
                    "f1aba098d3ccf5d66038ebb20cf489b0",
                    "b4b68d92f273c65ca63bc5ecc123c57d",
                    "19b3c9c955bf4733d6542bff787f22e9",
                    "b1f601234c8aa10b3c9cf83af3f6f164",
                    "bec6aee7ebe23e36d7b93a6d7b90f1b0",
                    "9b07ec1fe8276c6896ff74c3f8aaf05c",
                    "5d7c787e4fc800956231b6a40b16165a",
                    "d26926bd8d198166a4a5007f1dde8987",
                    "85b93632ff0023074c878be4e9e22b86",
                    "2973a0a2f2ba5332a9f0e7793a225e25",
                    "738c31b42e78a55d0078545b30c4ead5",
                    "820ffccb4937599d1d445d2063a96cb3",
                    "a6a1424f09550923149f7d8c98bbf206",
                    "4b569630500fe3d831baf95f7ecf1242",
                    "f7aa648b19581260f8ce7c5af0eda014",
                    "32eb9205694d78a51ef12c2ad1826251",
                    "7c0e561c05a6f2c6cb22ba8ed3736d80",
                    "948b96cebb06c2a1f1ff523e7793b8b8",
                    "50c61e3434b4d58683df763c3282c26b",
                    "282852d8b3dc8752c2b7d9dcfa1988ad",
                    "9e8c84a12ecc0825aac6875179c96f98",
                    "94262c8f68340a9ac6d73d4c555ce665",
                    "43ed83b224b4ac26b30f7d714c1cb40d",
                    "6c48642543b0512d41f56b9bb0bf49ac",
                    "0e02aa7f006ce550687d52cc7867fd09",
                    "2b5211c3ffb562a89a89f802475fe90d"
                ],
                "children" : [
                    {
                        "children_d" : [
                            "7b61ac2537d7f7be77006628f5ed95f0",
                            "ec6c2b7b91e55a5c23ab2e5676c4acf7",
                            "56331a638041e93075e859d784d296f3",
                            "a9b585362fe4109e651117e09e0ec495",
                            "f1aba098d3ccf5d66038ebb20cf489b0",
                            "b4b68d92f273c65ca63bc5ecc123c57d",
                            "19b3c9c955bf4733d6542bff787f22e9",
                            "b1f601234c8aa10b3c9cf83af3f6f164",
                            "bec6aee7ebe23e36d7b93a6d7b90f1b0",
                            "9b07ec1fe8276c6896ff74c3f8aaf05c",
                            "5d7c787e4fc800956231b6a40b16165a"
                        ],
                        "children" : [
                            {
                                "children_d" : [

                                ],
                                "children" : [

                                ],
                                "parents" : [
                                    "6c48642543b0512d41f56b9bb0bf49ac",
                                    "4",
                                    "#"
                                ],
                                "data" : {
                                    "search" : {
                                        "season" : [
                                            {
                                                "show" : 1,
                                                "id" : "rooms"
                                            },
                                            {
                                                "show" : 1,
                                                "id" : "price"
                                            },
                                            {
                                                "show" : 1,
                                                "id" : "suites"
                                            },
                                            {
                                                "show" : 1,
                                                "id" : "areas"
                                            },
                                            {
                                                "show" : 1,
                                                "id" : "garages"
                                            }
                                        ],
                                        "general" : [
                                            {
                                                "show" : 1,
                                                "id" : "price"
                                            },
                                            {
                                                "show" : 1,
                                                "id" : "area"
                                            },
                                            {
                                                "show" : 1,
                                                "id" : "room"
                                            },
                                            {
                                                "show" : 1,
                                                "id" : "suites"
                                            },
                                            {
                                                "show" : 1,
                                                "id" : "garages"
                                            }
                                        ]
                                    },
                                    "types" : [
                                        1,
                                        2,
                                        3,
                                        4
                                    ]
                                },
                                "state" : {

                                },
                                "a_attr" : {
                                    "href" : "#"
                                },
                                "li_attr" : {
                                    "id" : "7b61ac2537d7f7be77006628f5ed95f0"
                                },
                                "icon" : true,
                                "text" : "Apartamento Padrão",
                                "id" : "7b61ac2537d7f7be77006628f5ed95f0"
                            },
                            {
                                "children_d" : [

                                ],
                                "children" : [

                                ],
                                "parents" : [
                                    "6c48642543b0512d41f56b9bb0bf49ac",
                                    "4",
                                    "#"
                                ],
                                "data" : {
                                    "search" : {
                                        "season" : [
                                            {
                                                "show" : 1,
                                                "id" : "rooms"
                                            },
                                            {
                                                "show" : 1,
                                                "id" : "price"
                                            },
                                            {
                                                "show" : 1,
                                                "id" : "suites"
                                            },
                                            {
                                                "show" : 1,
                                                "id" : "areas"
                                            },
                                            {
                                                "show" : 1,
                                                "id" : "garages"
                                            }
                                        ],
                                        "general" : [
                                            {
                                                "show" : 1,
                                                "id" : "price"
                                            },
                                            {
                                                "show" : 1,
                                                "id" : "area"
                                            },
                                            {
                                                "show" : 1,
                                                "id" : "room"
                                            },
                                            {
                                                "show" : 1,
                                                "id" : "suites"
                                            },
                                            {
                                                "show" : 1,
                                                "id" : "garages"
                                            }
                                        ]
                                    },
                                    "types" : [
                                        1,
                                        2,
                                        3,
                                        4
                                    ]
                                },
                                "state" : {

                                },
                                "a_attr" : {
                                    "href" : "#"
                                },
                                "li_attr" : {
                                    "id" : "ec6c2b7b91e55a5c23ab2e5676c4acf7"
                                },
                                "icon" : true,
                                "text" : "Casa de Condomínio",
                                "id" : "ec6c2b7b91e55a5c23ab2e5676c4acf7"
                            },
                            {
                                "children_d" : [

                                ],
                                "children" : [

                                ],
                                "parents" : [
                                    "6c48642543b0512d41f56b9bb0bf49ac",
                                    "4",
                                    "#"
                                ],
                                "data" : {
                                    "search" : {
                                        "season" : [
                                            {
                                                "show" : 1,
                                                "id" : "rooms"
                                            },
                                            {
                                                "show" : 1,
                                                "id" : "price"
                                            },
                                            {
                                                "show" : 1,
                                                "id" : "suites"
                                            },
                                            {
                                                "show" : 1,
                                                "id" : "areas"
                                            },
                                            {
                                                "show" : 1,
                                                "id" : "garages"
                                            }
                                        ],
                                        "general" : [
                                            {
                                                "show" : 1,
                                                "id" : "price"
                                            },
                                            {
                                                "show" : 1,
                                                "id" : "area"
                                            },
                                            {
                                                "show" : 1,
                                                "id" : "room"
                                            },
                                            {
                                                "show" : 1,
                                                "id" : "suites"
                                            },
                                            {
                                                "show" : 1,
                                                "id" : "garages"
                                            }
                                        ]
                                    },
                                    "types" : [
                                        1,
                                        2,
                                        4
                                    ]
                                },
                                "state" : {

                                },
                                "a_attr" : {
                                    "href" : "#"
                                },
                                "li_attr" : {
                                    "id" : "56331a638041e93075e859d784d296f3"
                                },
                                "icon" : true,
                                "text" : "Casa de Vila",
                                "id" : "56331a638041e93075e859d784d296f3"
                            },
                            {
                                "children_d" : [

                                ],
                                "children" : [

                                ],
                                "parents" : [
                                    "6c48642543b0512d41f56b9bb0bf49ac",
                                    "4",
                                    "#"
                                ],
                                "data" : {
                                    "search" : {
                                        "season" : [
                                            {
                                                "show" : 1,
                                                "id" : "rooms"
                                            },
                                            {
                                                "show" : 1,
                                                "id" : "price"
                                            },
                                            {
                                                "show" : 1,
                                                "id" : "suites"
                                            },
                                            {
                                                "show" : 1,
                                                "id" : "areas"
                                            },
                                            {
                                                "show" : 1,
                                                "id" : "garages"
                                            }
                                        ],
                                        "general" : [
                                            {
                                                "show" : 1,
                                                "id" : "price"
                                            },
                                            {
                                                "show" : 1,
                                                "id" : "area"
                                            },
                                            {
                                                "show" : 1,
                                                "id" : "room"
                                            },
                                            {
                                                "show" : 1,
                                                "id" : "suites"
                                            },
                                            {
                                                "show" : 1,
                                                "id" : "garages"
                                            }
                                        ]
                                    },
                                    "types" : [
                                        1,
                                        2,
                                        3,
                                        4
                                    ]
                                },
                                "state" : {

                                },
                                "a_attr" : {
                                    "href" : "#"
                                },
                                "li_attr" : {
                                    "id" : "a9b585362fe4109e651117e09e0ec495"
                                },
                                "icon" : true,
                                "text" : "Casa Padrão",
                                "id" : "a9b585362fe4109e651117e09e0ec495"
                            },
                            {
                                "children_d" : [

                                ],
                                "children" : [

                                ],
                                "parents" : [
                                    "6c48642543b0512d41f56b9bb0bf49ac",
                                    "4",
                                    "#"
                                ],
                                "data" : {
                                    "search" : {
                                        "season" : [
                                            {
                                                "show" : 1,
                                                "id" : "rooms"
                                            },
                                            {
                                                "show" : 1,
                                                "id" : "price"
                                            },
                                            {
                                                "show" : 1,
                                                "id" : "suites"
                                            },
                                            {
                                                "show" : 1,
                                                "id" : "areas"
                                            },
                                            {
                                                "show" : 1,
                                                "id" : "garages"
                                            }
                                        ],
                                        "general" : [
                                            {
                                                "show" : 1,
                                                "id" : "price"
                                            },
                                            {
                                                "show" : 1,
                                                "id" : "area"
                                            },
                                            {
                                                "show" : 1,
                                                "id" : "room"
                                            },
                                            {
                                                "show" : 1,
                                                "id" : "suites"
                                            },
                                            {
                                                "show" : 1,
                                                "id" : "garages"
                                            }
                                        ]
                                    },
                                    "types" : [
                                        1,
                                        2,
                                        3,
                                        4
                                    ]
                                },
                                "state" : {

                                },
                                "a_attr" : {
                                    "href" : "#"
                                },
                                "li_attr" : {
                                    "id" : "f1aba098d3ccf5d66038ebb20cf489b0"
                                },
                                "icon" : true,
                                "text" : "Cobertura",
                                "id" : "f1aba098d3ccf5d66038ebb20cf489b0"
                            },
                            {
                                "children_d" : [

                                ],
                                "children" : [

                                ],
                                "parents" : [
                                    "6c48642543b0512d41f56b9bb0bf49ac",
                                    "4",
                                    "#"
                                ],
                                "data" : {
                                    "search" : {
                                        "season" : [
                                            {
                                                "show" : 1,
                                                "id" : "rooms"
                                            },
                                            {
                                                "show" : 1,
                                                "id" : "price"
                                            },
                                            {
                                                "show" : 1,
                                                "id" : "suites"
                                            },
                                            {
                                                "show" : 1,
                                                "id" : "areas"
                                            },
                                            {
                                                "show" : 1,
                                                "id" : "garages"
                                            }
                                        ],
                                        "general" : [
                                            {
                                                "show" : 1,
                                                "id" : "price"
                                            },
                                            {
                                                "show" : 1,
                                                "id" : "area"
                                            },
                                            {
                                                "show" : 1,
                                                "id" : "room"
                                            },
                                            {
                                                "show" : 1,
                                                "id" : "suites"
                                            },
                                            {
                                                "show" : 1,
                                                "id" : "garages"
                                            }
                                        ]
                                    },
                                    "types" : [
                                        1,
                                        2,
                                        3,
                                        4
                                    ]
                                },
                                "state" : {

                                },
                                "a_attr" : {
                                    "href" : "#"
                                },
                                "li_attr" : {
                                    "id" : "b4b68d92f273c65ca63bc5ecc123c57d"
                                },
                                "icon" : true,
                                "text" : "Flat",
                                "id" : "b4b68d92f273c65ca63bc5ecc123c57d"
                            },
                            {
                                "children_d" : [

                                ],
                                "children" : [

                                ],
                                "parents" : [
                                    "6c48642543b0512d41f56b9bb0bf49ac",
                                    "4",
                                    "#"
                                ],
                                "data" : {
                                    "search" : {
                                        "season" : [
                                            {
                                                "show" : 1,
                                                "id" : "rooms"
                                            },
                                            {
                                                "show" : 1,
                                                "id" : "price"
                                            },
                                            {
                                                "show" : 1,
                                                "id" : "suites"
                                            },
                                            {
                                                "show" : 1,
                                                "id" : "areas"
                                            },
                                            {
                                                "show" : 1,
                                                "id" : "garages"
                                            }
                                        ],
                                        "general" : [
                                            {
                                                "show" : 1,
                                                "id" : "price"
                                            },
                                            {
                                                "show" : 1,
                                                "id" : "area"
                                            },
                                            {
                                                "show" : 1,
                                                "id" : "room"
                                            },
                                            {
                                                "show" : 1,
                                                "id" : "suites"
                                            },
                                            {
                                                "show" : 1,
                                                "id" : "garages"
                                            }
                                        ]
                                    },
                                    "types" : [
                                        1,
                                        2,
                                        4
                                    ]
                                },
                                "state" : {

                                },
                                "a_attr" : {
                                    "href" : "#"
                                },
                                "li_attr" : {
                                    "id" : "19b3c9c955bf4733d6542bff787f22e9"
                                },
                                "icon" : true,
                                "text" : "Kitchenette-Conjugados",
                                "id" : "19b3c9c955bf4733d6542bff787f22e9"
                            },
                            {
                                "children_d" : [

                                ],
                                "children" : [

                                ],
                                "parents" : [
                                    "6c48642543b0512d41f56b9bb0bf49ac",
                                    "4",
                                    "#"
                                ],
                                "data" : {
                                    "search" : {
                                        "season" : [
                                            {
                                                "show" : 1,
                                                "id" : "rooms"
                                            },
                                            {
                                                "show" : 1,
                                                "id" : "price"
                                            },
                                            {
                                                "show" : 1,
                                                "id" : "suites"
                                            },
                                            {
                                                "show" : 1,
                                                "id" : "areas"
                                            },
                                            {
                                                "show" : 1,
                                                "id" : "garages"
                                            }
                                        ],
                                        "general" : [
                                            {
                                                "show" : 1,
                                                "id" : "price"
                                            },
                                            {
                                                "show" : 1,
                                                "id" : "area"
                                            },
                                            {
                                                "show" : 1,
                                                "id" : "room"
                                            },
                                            {
                                                "show" : 1,
                                                "id" : "suites"
                                            },
                                            {
                                                "show" : 1,
                                                "id" : "garages"
                                            }
                                        ]
                                    },
                                    "types" : [
                                        1,
                                        2,
                                        3,
                                        4
                                    ]
                                },
                                "state" : {

                                },
                                "a_attr" : {
                                    "href" : "#"
                                },
                                "li_attr" : {
                                    "id" : "b1f601234c8aa10b3c9cf83af3f6f164"
                                },
                                "icon" : true,
                                "text" : "Loft",
                                "id" : "b1f601234c8aa10b3c9cf83af3f6f164"
                            },
                            {
                                "children_d" : [

                                ],
                                "children" : [

                                ],
                                "parents" : [
                                    "6c48642543b0512d41f56b9bb0bf49ac",
                                    "4",
                                    "#"
                                ],
                                "data" : {
                                    "search" : {
                                        "season" : [
                                            {
                                                "show" : 1,
                                                "id" : "rooms"
                                            },
                                            {
                                                "show" : 1,
                                                "id" : "price"
                                            },
                                            {
                                                "show" : 1,
                                                "id" : "suites"
                                            },
                                            {
                                                "show" : 1,
                                                "id" : "areas"
                                            },
                                            {
                                                "show" : 1,
                                                "id" : "garages"
                                            }
                                        ],
                                        "general" : [
                                            {
                                                "show" : 1,
                                                "id" : "price"
                                            },
                                            {
                                                "show" : 1,
                                                "id" : "area"
                                            },
                                            {
                                                "show" : 0,
                                                "id" : "room"
                                            },
                                            {
                                                "show" : 0,
                                                "id" : "suites"
                                            },
                                            {
                                                "show" : 1,
                                                "id" : "garages"
                                            }
                                        ]
                                    },
                                    "types" : [
                                        1,
                                        2
                                    ]
                                },
                                "state" : {

                                },
                                "a_attr" : {
                                    "href" : "#"
                                },
                                "li_attr" : {
                                    "id" : "bec6aee7ebe23e36d7b93a6d7b90f1b0"
                                },
                                "icon" : true,
                                "text" : "Loteamento-Condomínio",
                                "id" : "bec6aee7ebe23e36d7b93a6d7b90f1b0"
                            },
                            {
                                "children_d" : [

                                ],
                                "children" : [

                                ],
                                "parents" : [
                                    "6c48642543b0512d41f56b9bb0bf49ac",
                                    "4",
                                    "#"
                                ],
                                "data" : {
                                    "search" : {
                                        "season" : [
                                            {
                                                "show" : 1,
                                                "id" : "rooms"
                                            },
                                            {
                                                "show" : 1,
                                                "id" : "price"
                                            },
                                            {
                                                "show" : 1,
                                                "id" : "suites"
                                            },
                                            {
                                                "show" : 1,
                                                "id" : "areas"
                                            },
                                            {
                                                "show" : 1,
                                                "id" : "garages"
                                            }
                                        ],
                                        "general" : [
                                            {
                                                "show" : 1,
                                                "id" : "price"
                                            },
                                            {
                                                "show" : 1,
                                                "id" : "area"
                                            },
                                            {
                                                "show" : 1,
                                                "id" : "room"
                                            },
                                            {
                                                "show" : 1,
                                                "id" : "suites"
                                            },
                                            {
                                                "show" : 1,
                                                "id" : "garages"
                                            }
                                        ]
                                    },
                                    "types" : [
                                        2
                                    ]
                                },
                                "state" : {

                                },
                                "a_attr" : {
                                    "href" : "#"
                                },
                                "li_attr" : {
                                    "id" : "9b07ec1fe8276c6896ff74c3f8aaf05c"
                                },
                                "icon" : true,
                                "text" : "Studio",
                                "id" : "9b07ec1fe8276c6896ff74c3f8aaf05c"
                            },
                            {
                                "children_d" : [

                                ],
                                "children" : [

                                ],
                                "parents" : [
                                    "6c48642543b0512d41f56b9bb0bf49ac",
                                    "4",
                                    "#"
                                ],
                                "data" : {
                                    "search" : {
                                        "season" : [
                                            {
                                                "show" : 0,
                                                "id" : "rooms"
                                            },
                                            {
                                                "show" : 1,
                                                "id" : "price"
                                            },
                                            {
                                                "show" : 0,
                                                "id" : "suites"
                                            },
                                            {
                                                "show" : 1,
                                                "id" : "areas"
                                            },
                                            {
                                                "show" : 1,
                                                "id" : "garages"
                                            }
                                        ],
                                        "general" : [
                                            {
                                                "show" : 1,
                                                "id" : "price"
                                            },
                                            {
                                                "show" : 1,
                                                "id" : "area"
                                            },
                                            {
                                                "show" : 0,
                                                "id" : "room"
                                            },
                                            {
                                                "show" : 0,
                                                "id" : "suites"
                                            },
                                            {
                                                "show" : 1,
                                                "id" : "garages"
                                            }
                                        ]
                                    },
                                    "types" : [
                                        1,
                                        2,
                                        4
                                    ]
                                },
                                "state" : {

                                },
                                "a_attr" : {
                                    "href" : "#"
                                },
                                "li_attr" : {
                                    "id" : "5d7c787e4fc800956231b6a40b16165a"
                                },
                                "icon" : true,
                                "text" : "Terreno Padrão",
                                "id" : "5d7c787e4fc800956231b6a40b16165a"
                            }
                        ],
                        "parents" : [
                            "4",
                            "#"
                        ],
                        "data" : {
                            "types" : [
                                1,
                                2,
                                3,
                                4
                            ]
                        },
                        "state" : {

                        },
                        "a_attr" : {
                            "href" : "#"
                        },
                        "li_attr" : {
                            "id" : "6c48642543b0512d41f56b9bb0bf49ac"
                        },
                        "icon" : true,
                        "text" : "Residencial",
                        "id" : "6c48642543b0512d41f56b9bb0bf49ac"
                    },
                    {
                        "children_d" : [
                            "d26926bd8d198166a4a5007f1dde8987",
                            "85b93632ff0023074c878be4e9e22b86",
                            "2973a0a2f2ba5332a9f0e7793a225e25",
                            "738c31b42e78a55d0078545b30c4ead5",
                            "820ffccb4937599d1d445d2063a96cb3",
                            "a6a1424f09550923149f7d8c98bbf206",
                            "4b569630500fe3d831baf95f7ecf1242",
                            "f7aa648b19581260f8ce7c5af0eda014",
                            "32eb9205694d78a51ef12c2ad1826251",
                            "7c0e561c05a6f2c6cb22ba8ed3736d80",
                            "948b96cebb06c2a1f1ff523e7793b8b8",
                            "50c61e3434b4d58683df763c3282c26b"
                        ],
                        "children" : [
                            {
                                "children_d" : [

                                ],
                                "children" : [

                                ],
                                "parents" : [
                                    "0e02aa7f006ce550687d52cc7867fd09",
                                    "4",
                                    "#"
                                ],
                                "data" : {
                                    "search" : {
                                        "season" : [
                                            {
                                                "show" : 0,
                                                "id" : "rooms"
                                            },
                                            {
                                                "show" : 1,
                                                "id" : "price"
                                            },
                                            {
                                                "show" : 0,
                                                "id" : "suites"
                                            },
                                            {
                                                "show" : 1,
                                                "id" : "areas"
                                            },
                                            {
                                                "show" : 1,
                                                "id" : "garages"
                                            }
                                        ],
                                        "general" : [
                                            {
                                                "show" : 1,
                                                "id" : "price"
                                            },
                                            {
                                                "show" : 1,
                                                "id" : "area"
                                            },
                                            {
                                                "show" : 0,
                                                "id" : "room"
                                            },
                                            {
                                                "show" : 0,
                                                "id" : "suites"
                                            },
                                            {
                                                "show" : 1,
                                                "id" : "garages"
                                            }
                                        ]
                                    },
                                    "types" : [
                                        1,
                                        2,
                                        4
                                    ]
                                },
                                "state" : {

                                },
                                "a_attr" : {
                                    "href" : "#"
                                },
                                "li_attr" : {
                                    "id" : "d26926bd8d198166a4a5007f1dde8987"
                                },
                                "icon" : true,
                                "text" : "Box-Garagem",
                                "id" : "d26926bd8d198166a4a5007f1dde8987"
                            },
                            {
                                "children_d" : [

                                ],
                                "children" : [

                                ],
                                "parents" : [
                                    "0e02aa7f006ce550687d52cc7867fd09",
                                    "4",
                                    "#"
                                ],
                                "data" : {
                                    "search" : {
                                        "season" : [
                                            {
                                                "show" : 1,
                                                "id" : "rooms"
                                            },
                                            {
                                                "show" : 1,
                                                "id" : "price"
                                            },
                                            {
                                                "show" : 1,
                                                "id" : "suites"
                                            },
                                            {
                                                "show" : 1,
                                                "id" : "areas"
                                            },
                                            {
                                                "show" : 1,
                                                "id" : "garages"
                                            }
                                        ],
                                        "general" : [
                                            {
                                                "show" : 1,
                                                "id" : "price"
                                            },
                                            {
                                                "show" : 1,
                                                "id" : "area"
                                            },
                                            {
                                                "show" : 1,
                                                "id" : "room"
                                            },
                                            {
                                                "show" : 1,
                                                "id" : "suites"
                                            },
                                            {
                                                "show" : 1,
                                                "id" : "garages"
                                            }
                                        ]
                                    },
                                    "types" : [
                                        1,
                                        2,
                                        4
                                    ]
                                },
                                "state" : {

                                },
                                "a_attr" : {
                                    "href" : "#"
                                },
                                "li_attr" : {
                                    "id" : "85b93632ff0023074c878be4e9e22b86"
                                },
                                "icon" : true,
                                "text" : "Casa Comercial",
                                "id" : "85b93632ff0023074c878be4e9e22b86"
                            },
                            {
                                "children_d" : [

                                ],
                                "children" : [

                                ],
                                "parents" : [
                                    "0e02aa7f006ce550687d52cc7867fd09",
                                    "4",
                                    "#"
                                ],
                                "data" : {
                                    "search" : {
                                        "season" : [
                                            {
                                                "show" : 1,
                                                "id" : "rooms"
                                            },
                                            {
                                                "show" : 1,
                                                "id" : "price"
                                            },
                                            {
                                                "show" : 0,
                                                "id" : "suites"
                                            },
                                            {
                                                "show" : 1,
                                                "id" : "areas"
                                            },
                                            {
                                                "show" : 1,
                                                "id" : "garages"
                                            }
                                        ],
                                        "general" : [
                                            {
                                                "show" : 1,
                                                "id" : "price"
                                            },
                                            {
                                                "show" : 1,
                                                "id" : "area"
                                            },
                                            {
                                                "show" : 1,
                                                "id" : "room"
                                            },
                                            {
                                                "show" : 0,
                                                "id" : "suites"
                                            },
                                            {
                                                "show" : 1,
                                                "id" : "garages"
                                            }
                                        ]
                                    },
                                    "types" : [
                                        1,
                                        2,
                                        3,
                                        4
                                    ]
                                },
                                "state" : {

                                },
                                "a_attr" : {
                                    "href" : "#"
                                },
                                "li_attr" : {
                                    "id" : "2973a0a2f2ba5332a9f0e7793a225e25"
                                },
                                "icon" : true,
                                "text" : "Conjunto Comercial-Sala",
                                "id" : "2973a0a2f2ba5332a9f0e7793a225e25"
                            },
                            {
                                "children_d" : [

                                ],
                                "children" : [

                                ],
                                "parents" : [
                                    "0e02aa7f006ce550687d52cc7867fd09",
                                    "4",
                                    "#"
                                ],
                                "data" : {
                                    "search" : {
                                        "season" : [
                                            {
                                                "show" : 1,
                                                "id" : "rooms"
                                            },
                                            {
                                                "show" : 1,
                                                "id" : "price"
                                            },
                                            {
                                                "show" : 0,
                                                "id" : "suites"
                                            },
                                            {
                                                "show" : 1,
                                                "id" : "areas"
                                            },
                                            {
                                                "show" : 1,
                                                "id" : "garages"
                                            }
                                        ],
                                        "general" : [
                                            {
                                                "show" : 1,
                                                "id" : "price"
                                            },
                                            {
                                                "show" : 1,
                                                "id" : "area"
                                            },
                                            {
                                                "show" : 1,
                                                "id" : "room"
                                            },
                                            {
                                                "show" : 0,
                                                "id" : "suites"
                                            },
                                            {
                                                "show" : 1,
                                                "id" : "garages"
                                            }
                                        ]
                                    },
                                    "types" : [
                                        1,
                                        2
                                    ]
                                },
                                "state" : {

                                },
                                "a_attr" : {
                                    "href" : "#"
                                },
                                "li_attr" : {
                                    "id" : "738c31b42e78a55d0078545b30c4ead5"
                                },
                                "icon" : true,
                                "text" : "Galpão-Depósito-Armazém",
                                "id" : "738c31b42e78a55d0078545b30c4ead5"
                            },
                            {
                                "children_d" : [

                                ],
                                "children" : [

                                ],
                                "parents" : [
                                    "0e02aa7f006ce550687d52cc7867fd09",
                                    "4",
                                    "#"
                                ],
                                "data" : {
                                    "search" : {
                                        "season" : [
                                            {
                                                "show" : 1,
                                                "id" : "rooms"
                                            },
                                            {
                                                "show" : 1,
                                                "id" : "price"
                                            },
                                            {
                                                "show" : 1,
                                                "id" : "suites"
                                            },
                                            {
                                                "show" : 1,
                                                "id" : "areas"
                                            },
                                            {
                                                "show" : 1,
                                                "id" : "garages"
                                            }
                                        ],
                                        "general" : [
                                            {
                                                "show" : 1,
                                                "id" : "price"
                                            },
                                            {
                                                "show" : 1,
                                                "id" : "area"
                                            },
                                            {
                                                "show" : 1,
                                                "id" : "room"
                                            },
                                            {
                                                "show" : 1,
                                                "id" : "suites"
                                            },
                                            {
                                                "show" : 1,
                                                "id" : "garages"
                                            }
                                        ]
                                    },
                                    "types" : [
                                        1,
                                        2,
                                        3,
                                        4
                                    ]
                                },
                                "state" : {

                                },
                                "a_attr" : {
                                    "href" : "#"
                                },
                                "li_attr" : {
                                    "id" : "820ffccb4937599d1d445d2063a96cb3"
                                },
                                "icon" : true,
                                "text" : "Hotel",
                                "id" : "820ffccb4937599d1d445d2063a96cb3"
                            },
                            {
                                "children_d" : [

                                ],
                                "children" : [

                                ],
                                "parents" : [
                                    "0e02aa7f006ce550687d52cc7867fd09",
                                    "4",
                                    "#"
                                ],
                                "data" : {
                                    "search" : {
                                        "season" : [
                                            {
                                                "show" : 1,
                                                "id" : "rooms"
                                            },
                                            {
                                                "show" : 1,
                                                "id" : "price"
                                            },
                                            {
                                                "show" : 0,
                                                "id" : "suites"
                                            },
                                            {
                                                "show" : 1,
                                                "id" : "areas"
                                            },
                                            {
                                                "show" : 1,
                                                "id" : "garages"
                                            }
                                        ],
                                        "general" : [
                                            {
                                                "show" : 1,
                                                "id" : "price"
                                            },
                                            {
                                                "show" : 1,
                                                "id" : "area"
                                            },
                                            {
                                                "show" : 1,
                                                "id" : "room"
                                            },
                                            {
                                                "show" : 0,
                                                "id" : "suites"
                                            },
                                            {
                                                "show" : 1,
                                                "id" : "garages"
                                            }
                                        ]
                                    },
                                    "types" : [
                                        1,
                                        2
                                    ]
                                },
                                "state" : {

                                },
                                "a_attr" : {
                                    "href" : "#"
                                },
                                "li_attr" : {
                                    "id" : "a6a1424f09550923149f7d8c98bbf206"
                                },
                                "icon" : true,
                                "text" : "Indústria",
                                "id" : "a6a1424f09550923149f7d8c98bbf206"
                            },
                            {
                                "children_d" : [

                                ],
                                "children" : [

                                ],
                                "parents" : [
                                    "0e02aa7f006ce550687d52cc7867fd09",
                                    "4",
                                    "#"
                                ],
                                "data" : {
                                    "search" : {
                                        "season" : [
                                            {
                                                "show" : 1,
                                                "id" : "rooms"
                                            },
                                            {
                                                "show" : 1,
                                                "id" : "price"
                                            },
                                            {
                                                "show" : 0,
                                                "id" : "suites"
                                            },
                                            {
                                                "show" : 1,
                                                "id" : "areas"
                                            },
                                            {
                                                "show" : 1,
                                                "id" : "garages"
                                            }
                                        ],
                                        "general" : [
                                            {
                                                "show" : 1,
                                                "id" : "price"
                                            },
                                            {
                                                "show" : 1,
                                                "id" : "area"
                                            },
                                            {
                                                "show" : 1,
                                                "id" : "room"
                                            },
                                            {
                                                "show" : 0,
                                                "id" : "suites"
                                            },
                                            {
                                                "show" : 1,
                                                "id" : "garages"
                                            }
                                        ]
                                    },
                                    "types" : [
                                        1,
                                        2
                                    ]
                                },
                                "state" : {

                                },
                                "a_attr" : {
                                    "href" : "#"
                                },
                                "li_attr" : {
                                    "id" : "4b569630500fe3d831baf95f7ecf1242"
                                },
                                "icon" : true,
                                "text" : "Loja Shopping-Ct. Comercial",
                                "id" : "4b569630500fe3d831baf95f7ecf1242"
                            },
                            {
                                "children_d" : [

                                ],
                                "children" : [

                                ],
                                "parents" : [
                                    "0e02aa7f006ce550687d52cc7867fd09",
                                    "4",
                                    "#"
                                ],
                                "data" : {
                                    "search" : {
                                        "season" : [
                                            {
                                                "show" : 1,
                                                "id" : "rooms"
                                            },
                                            {
                                                "show" : 1,
                                                "id" : "price"
                                            },
                                            {
                                                "show" : 0,
                                                "id" : "suites"
                                            },
                                            {
                                                "show" : 1,
                                                "id" : "areas"
                                            },
                                            {
                                                "show" : 1,
                                                "id" : "garages"
                                            }
                                        ],
                                        "general" : [
                                            {
                                                "show" : 1,
                                                "id" : "price"
                                            },
                                            {
                                                "show" : 1,
                                                "id" : "area"
                                            },
                                            {
                                                "show" : 1,
                                                "id" : "room"
                                            },
                                            {
                                                "show" : 0,
                                                "id" : "suites"
                                            },
                                            {
                                                "show" : 1,
                                                "id" : "garages"
                                            }
                                        ]
                                    },
                                    "types" : [
                                        1,
                                        2,
                                        4
                                    ]
                                },
                                "state" : {

                                },
                                "a_attr" : {
                                    "href" : "#"
                                },
                                "li_attr" : {
                                    "id" : "f7aa648b19581260f8ce7c5af0eda014"
                                },
                                "icon" : true,
                                "text" : "Loja-Salão",
                                "id" : "f7aa648b19581260f8ce7c5af0eda014"
                            },
                            {
                                "children_d" : [

                                ],
                                "children" : [

                                ],
                                "parents" : [
                                    "0e02aa7f006ce550687d52cc7867fd09",
                                    "4",
                                    "#"
                                ],
                                "data" : {
                                    "search" : {
                                        "season" : [
                                            {
                                                "show" : 1,
                                                "id" : "rooms"
                                            },
                                            {
                                                "show" : 1,
                                                "id" : "price"
                                            },
                                            {
                                                "show" : 1,
                                                "id" : "suites"
                                            },
                                            {
                                                "show" : 1,
                                                "id" : "areas"
                                            },
                                            {
                                                "show" : 1,
                                                "id" : "garages"
                                            }
                                        ],
                                        "general" : [
                                            {
                                                "show" : 1,
                                                "id" : "price"
                                            },
                                            {
                                                "show" : 1,
                                                "id" : "area"
                                            },
                                            {
                                                "show" : 1,
                                                "id" : "room"
                                            },
                                            {
                                                "show" : 1,
                                                "id" : "suites"
                                            },
                                            {
                                                "show" : 1,
                                                "id" : "garages"
                                            }
                                        ]
                                    },
                                    "types" : [
                                        2
                                    ]
                                },
                                "state" : {

                                },
                                "a_attr" : {
                                    "href" : "#"
                                },
                                "li_attr" : {
                                    "id" : "32eb9205694d78a51ef12c2ad1826251"
                                },
                                "icon" : true,
                                "text" : "Motel",
                                "id" : "32eb9205694d78a51ef12c2ad1826251"
                            },
                            {
                                "children_d" : [

                                ],
                                "children" : [

                                ],
                                "parents" : [
                                    "0e02aa7f006ce550687d52cc7867fd09",
                                    "4",
                                    "#"
                                ],
                                "data" : {
                                    "search" : {
                                        "season" : [
                                            {
                                                "show" : 1,
                                                "id" : "rooms"
                                            },
                                            {
                                                "show" : 1,
                                                "id" : "price"
                                            },
                                            {
                                                "show" : 1,
                                                "id" : "suites"
                                            },
                                            {
                                                "show" : 1,
                                                "id" : "areas"
                                            },
                                            {
                                                "show" : 1,
                                                "id" : "garages"
                                            }
                                        ],
                                        "general" : [
                                            {
                                                "show" : 1,
                                                "id" : "price"
                                            },
                                            {
                                                "show" : 1,
                                                "id" : "area"
                                            },
                                            {
                                                "show" : 1,
                                                "id" : "room"
                                            },
                                            {
                                                "show" : 1,
                                                "id" : "suites"
                                            },
                                            {
                                                "show" : 1,
                                                "id" : "garages"
                                            }
                                        ]
                                    },
                                    "types" : [
                                        1,
                                        2,
                                        4
                                    ]
                                },
                                "state" : {

                                },
                                "a_attr" : {
                                    "href" : "#"
                                },
                                "li_attr" : {
                                    "id" : "7c0e561c05a6f2c6cb22ba8ed3736d80"
                                },
                                "icon" : true,
                                "text" : "Pousada-Chalé",
                                "id" : "7c0e561c05a6f2c6cb22ba8ed3736d80"
                            },
                            {
                                "children_d" : [

                                ],
                                "children" : [

                                ],
                                "parents" : [
                                    "0e02aa7f006ce550687d52cc7867fd09",
                                    "4",
                                    "#"
                                ],
                                "data" : {
                                    "search" : {
                                        "season" : [
                                            {
                                                "show" : 1,
                                                "id" : "rooms"
                                            },
                                            {
                                                "show" : 1,
                                                "id" : "price"
                                            },
                                            {
                                                "show" : 0,
                                                "id" : "suites"
                                            },
                                            {
                                                "show" : 1,
                                                "id" : "areas"
                                            },
                                            {
                                                "show" : 1,
                                                "id" : "garages"
                                            }
                                        ],
                                        "general" : [
                                            {
                                                "show" : 1,
                                                "id" : "price"
                                            },
                                            {
                                                "show" : 1,
                                                "id" : "area"
                                            },
                                            {
                                                "show" : 1,
                                                "id" : "room"
                                            },
                                            {
                                                "show" : 0,
                                                "id" : "suites"
                                            },
                                            {
                                                "show" : 1,
                                                "id" : "garages"
                                            }
                                        ]
                                    },
                                    "types" : [
                                        1,
                                        2,
                                        4
                                    ]
                                },
                                "state" : {

                                },
                                "a_attr" : {
                                    "href" : "#"
                                },
                                "li_attr" : {
                                    "id" : "948b96cebb06c2a1f1ff523e7793b8b8"
                                },
                                "icon" : true,
                                "text" : "Prédio Inteiro",
                                "id" : "948b96cebb06c2a1f1ff523e7793b8b8"
                            },
                            {
                                "children_d" : [

                                ],
                                "children" : [

                                ],
                                "parents" : [
                                    "0e02aa7f006ce550687d52cc7867fd09",
                                    "4",
                                    "#"
                                ],
                                "data" : {
                                    "search" : {
                                        "season" : [
                                            {
                                                "show" : 1,
                                                "id" : "rooms"
                                            },
                                            {
                                                "show" : 1,
                                                "id" : "price"
                                            },
                                            {
                                                "show" : 0,
                                                "id" : "suites"
                                            },
                                            {
                                                "show" : 1,
                                                "id" : "areas"
                                            },
                                            {
                                                "show" : 1,
                                                "id" : "garages"
                                            }
                                        ],
                                        "general" : [
                                            {
                                                "show" : 1,
                                                "id" : "price"
                                            },
                                            {
                                                "show" : 1,
                                                "id" : "area"
                                            },
                                            {
                                                "show" : 1,
                                                "id" : "room"
                                            },
                                            {
                                                "show" : 0,
                                                "id" : "suites"
                                            },
                                            {
                                                "show" : 1,
                                                "id" : "garages"
                                            }
                                        ]
                                    },
                                    "types" : [
                                        1,
                                        2,
                                        4
                                    ]
                                },
                                "state" : {

                                },
                                "a_attr" : {
                                    "href" : "#"
                                },
                                "li_attr" : {
                                    "id" : "50c61e3434b4d58683df763c3282c26b"
                                },
                                "icon" : true,
                                "text" : "Studio",
                                "id" : "50c61e3434b4d58683df763c3282c26b"
                            }
                        ],
                        "parents" : [
                            "4",
                            "#"
                        ],
                        "data" : {
                            "types" : [
                                1,
                                2,
                                3,
                                4
                            ]
                        },
                        "state" : {

                        },
                        "a_attr" : {
                            "href" : "#"
                        },
                        "li_attr" : {
                            "id" : "0e02aa7f006ce550687d52cc7867fd09"
                        },
                        "icon" : true,
                        "text" : "Comercial",
                        "id" : "0e02aa7f006ce550687d52cc7867fd09"
                    },
                    {
                        "children_d" : [
                            "282852d8b3dc8752c2b7d9dcfa1988ad",
                            "9e8c84a12ecc0825aac6875179c96f98",
                            "94262c8f68340a9ac6d73d4c555ce665",
                            "43ed83b224b4ac26b30f7d714c1cb40d"
                        ],
                        "children" : [
                            {
                                "children_d" : [

                                ],
                                "children" : [

                                ],
                                "parents" : [
                                    "2b5211c3ffb562a89a89f802475fe90d",
                                    "4",
                                    "#"
                                ],
                                "data" : {
                                    "search" : {
                                        "season" : [
                                            {
                                                "show" : 1,
                                                "id" : "rooms"
                                            },
                                            {
                                                "show" : 1,
                                                "id" : "price"
                                            },
                                            {
                                                "show" : 1,
                                                "id" : "suites"
                                            },
                                            {
                                                "show" : 1,
                                                "id" : "areas"
                                            },
                                            {
                                                "show" : 1,
                                                "id" : "garages"
                                            }
                                        ],
                                        "general" : [
                                            {
                                                "show" : 1,
                                                "id" : "price"
                                            },
                                            {
                                                "show" : 1,
                                                "id" : "area"
                                            },
                                            {
                                                "show" : 1,
                                                "id" : "room"
                                            },
                                            {
                                                "show" : 1,
                                                "id" : "suites"
                                            },
                                            {
                                                "show" : 1,
                                                "id" : "garages"
                                            }
                                        ]
                                    },
                                    "types" : [
                                        1,
                                        2,
                                        4
                                    ]
                                },
                                "state" : {

                                },
                                "a_attr" : {
                                    "href" : "#"
                                },
                                "li_attr" : {
                                    "id" : "282852d8b3dc8752c2b7d9dcfa1988ad"
                                },
                                "icon" : true,
                                "text" : "Chácara",
                                "id" : "282852d8b3dc8752c2b7d9dcfa1988ad"
                            },
                            {
                                "children_d" : [

                                ],
                                "children" : [

                                ],
                                "parents" : [
                                    "2b5211c3ffb562a89a89f802475fe90d",
                                    "4",
                                    "#"
                                ],
                                "data" : {
                                    "search" : {
                                        "season" : [
                                            {
                                                "show" : 1,
                                                "id" : "rooms"
                                            },
                                            {
                                                "show" : 1,
                                                "id" : "price"
                                            },
                                            {
                                                "show" : 1,
                                                "id" : "suites"
                                            },
                                            {
                                                "show" : 1,
                                                "id" : "areas"
                                            },
                                            {
                                                "show" : 1,
                                                "id" : "garages"
                                            }
                                        ],
                                        "general" : [
                                            {
                                                "show" : 1,
                                                "id" : "price"
                                            },
                                            {
                                                "show" : 1,
                                                "id" : "area"
                                            },
                                            {
                                                "show" : 1,
                                                "id" : "room"
                                            },
                                            {
                                                "show" : 1,
                                                "id" : "suites"
                                            },
                                            {
                                                "show" : 1,
                                                "id" : "garages"
                                            }
                                        ]
                                    },
                                    "types" : [
                                        1,
                                        2,
                                        4
                                    ]
                                },
                                "state" : {

                                },
                                "a_attr" : {
                                    "href" : "#"
                                },
                                "li_attr" : {
                                    "id" : "9e8c84a12ecc0825aac6875179c96f98"
                                },
                                "icon" : true,
                                "text" : "Fazenda",
                                "id" : "9e8c84a12ecc0825aac6875179c96f98"
                            },
                            {
                                "children_d" : [

                                ],
                                "children" : [

                                ],
                                "parents" : [
                                    "2b5211c3ffb562a89a89f802475fe90d",
                                    "4",
                                    "#"
                                ],
                                "data" : {
                                    "search" : {
                                        "season" : [
                                            {
                                                "show" : 1,
                                                "id" : "rooms"
                                            },
                                            {
                                                "show" : 1,
                                                "id" : "price"
                                            },
                                            {
                                                "show" : 1,
                                                "id" : "suites"
                                            },
                                            {
                                                "show" : 1,
                                                "id" : "areas"
                                            },
                                            {
                                                "show" : 1,
                                                "id" : "garages"
                                            }
                                        ],
                                        "general" : [
                                            {
                                                "show" : 1,
                                                "id" : "price"
                                            },
                                            {
                                                "show" : 1,
                                                "id" : "area"
                                            },
                                            {
                                                "show" : 1,
                                                "id" : "room"
                                            },
                                            {
                                                "show" : 1,
                                                "id" : "suites"
                                            },
                                            {
                                                "show" : 1,
                                                "id" : "garages"
                                            }
                                        ]
                                    },
                                    "types" : [
                                        1,
                                        2
                                    ]
                                },
                                "state" : {

                                },
                                "a_attr" : {
                                    "href" : "#"
                                },
                                "li_attr" : {
                                    "id" : "94262c8f68340a9ac6d73d4c555ce665"
                                },
                                "icon" : true,
                                "text" : "Haras",
                                "id" : "94262c8f68340a9ac6d73d4c555ce665"
                            },
                            {
                                "children_d" : [

                                ],
                                "children" : [

                                ],
                                "parents" : [
                                    "2b5211c3ffb562a89a89f802475fe90d",
                                    "4",
                                    "#"
                                ],
                                "data" : {
                                    "search" : {
                                        "season" : [
                                            {
                                                "show" : 1,
                                                "id" : "rooms"
                                            },
                                            {
                                                "show" : 1,
                                                "id" : "price"
                                            },
                                            {
                                                "show" : 1,
                                                "id" : "suites"
                                            },
                                            {
                                                "show" : 1,
                                                "id" : "areas"
                                            },
                                            {
                                                "show" : 1,
                                                "id" : "garages"
                                            }
                                        ],
                                        "general" : [
                                            {
                                                "show" : 1,
                                                "id" : "price"
                                            },
                                            {
                                                "show" : 1,
                                                "id" : "area"
                                            },
                                            {
                                                "show" : 1,
                                                "id" : "room"
                                            },
                                            {
                                                "show" : 1,
                                                "id" : "suites"
                                            },
                                            {
                                                "show" : 1,
                                                "id" : "garages"
                                            }
                                        ]
                                    },
                                    "types" : [
                                        1,
                                        2,
                                        4
                                    ]
                                },
                                "state" : {

                                },
                                "a_attr" : {
                                    "href" : "#"
                                },
                                "li_attr" : {
                                    "id" : "43ed83b224b4ac26b30f7d714c1cb40d"
                                },
                                "icon" : true,
                                "text" : "Sítio",
                                "id" : "43ed83b224b4ac26b30f7d714c1cb40d"
                            }
                        ],
                        "parents" : [
                            "4",
                            "#"
                        ],
                        "data" : {
                            "types" : [
                                1,
                                2,
                                4
                            ]
                        },
                        "state" : {

                        },
                        "a_attr" : {
                            "href" : "#"
                        },
                        "li_attr" : {
                            "id" : "2b5211c3ffb562a89a89f802475fe90d"
                        },
                        "icon" : true,
                        "text" : "Rural",
                        "id" : "2b5211c3ffb562a89a89f802475fe90d"
                    }
                ],
                "parents" : [
                    "#"
                ],
                "data" : null,
                "state" : {

                },
                "a_attr" : {
                    "href" : "#"
                },
                "li_attr" : {
                    "id" : "4"
                },
                "icon" : true,
                "text" : "Imóveis",
                "id" : "4"
            }
        ],
        "flat" : [
            {
                "parent" : "#",
                "children_d" : [

                ],
                "children" : [

                ],
                "parents" : [
                    "#"
                ],
                "data" : null,
                "state" : {

                },
                "a_attr" : {
                    "href" : "#"
                },
                "li_attr" : {
                    "id" : "0"
                },
                "icon" : true,
                "text" : "[Sem Categoria]",
                "id" : "0"
            },
            {
                "parent" : "#",
                "children_d" : [
                    "fe0cc6c3abb85023422421fcd6ed3446",
                    "d3cea25408e238e5143f34bc24e16ef5",
                    "33c573f5f1446718fb5d25fb47319b28",
                    "199a86a9ec2cd637adb0db6ab9977064",
                    "15532b48643a1c0bc91d46ce2e21b53f",
                    "6b8a4756ff926835765715057ae4d240",
                    "d7dd271b8a6b2a72d9ca975ff0b867ec",
                    "af1bd9c82d9a3a1352ea60db87193a7a",
                    "9e01641e6d6c85d62e98f4e9784640cf",
                    "f263673d4cb28a3bd2bd6b27a589d5c9",
                    "d92a30048a1114d4d6d3f0c1fc066b66",
                    "25e770d9fbca8d00b3347a04897b56a0",
                    "dfe2854d1b9909247a56372273fe749d",
                    "cca6c536ec85b86105b3013c1d5321cb",
                    "ec37d84ed96a03791c78127014605d84",
                    "0391b5d5f9b374854f042d016a697d55",
                    "7a5cecf0790dbafd269d60a00764a3d5",
                    "607a7c108cf6c5cdf4fa5fe0b82ea629",
                    "403968b638de3b50b92b26d4b5f5efa8",
                    "c992e37cce2f683c5c39dda9f5bf542c",
                    "94828b2107e9c5143ac8f4bba83e35ba",
                    "7069d6df62d608ff3d2ef2f0adfea2fa",
                    "4468f963069516fe2a1483fd39981f65",
                    "4cecdf078819bea8fb9a4082c569fdc5",
                    "34fbd0d689db3335408563ac8a29d453",
                    "b87abe0dd15c0cd94799938e5ec46d68",
                    "ee7cc57dc1db680baf38093ac5d50b47",
                    "e60ca50ff3d315f85ef4ac948a8dca8b",
                    "ba21c668394d487fc1192daf0e26f323",
                    "ced2debb7b85ee7fb98f3aaeb1abcf27",
                    "5780d6e232072191fce417bf3ee28841",
                    "cda21cbc4092fd55a2356fb742918f17",
                    "23d475cd87aaae427ad5ce4b19aa18ef",
                    "a79d33c98ce5f435625d54545b41b224",
                    "82b6371a3b4c9b293a11e2b4e264c319",
                    "8b2fcd729d00b648350e2f21114caef0",
                    "0b25aee33c1e4a214e44986fa0e186c1",
                    "0ebd078607e2acbb520de216db36487f",
                    "3e0514449b0fef556d70ca2ba5ce2d6c",
                    "a75d6da0184ad89b168042e5e20bc5d1",
                    "d1cc1a413420a7721eba692a877b8fed",
                    "338018ecf3c8ddbadd72c4049f42dca9",
                    "83b7e67b96548217d5a1bd465d16941c",
                    "f46041daadbd51f94ecaf765d63c15b6",
                    "2cf8fdfa9e43d33357734276011824a0",
                    "f6812f1e7119d69cb4a429fa70182ccc",
                    "fe684377d80697154e301a503e1d9b53",
                    "c9f71de0aa30d48451771a587a0f7007",
                    "f998ccb6508dd98147561e3be53f5e4c",
                    "02d0efc85390dc6b48d777ecf8bb3d4a",
                    "ab3b768ba769aed6c7c3f6a29914d158",
                    "8e49300a2176751be58fc4d5e7b67cd7",
                    "6d2043bfc2cc762f071f6cb3d6cfebbd",
                    "4ca09aa3e220b93d5a29bc2f6ff2bd2a",
                    "d0d41a5d0277f77119806e7ed6dafd68",
                    "a7885fe0a2964f918a46e4b502227ca7",
                    "48511030865ae29d8df225e1e8d55644",
                    "d66eea96b89f4ea751c1970f7c7a2a58",
                    "71c63b63153cc04baf567f338836b9ed",
                    "cf724e52a4e9311f63ba6d2cad7aafaa",
                    "f071b23db727687957ea52cbc46e06c3",
                    "e40fa6b2c708d08246c048e3a6bdacef",
                    "a15cca6e62ab083cde3fb12a04e171a7",
                    "a9d013c279dbee7d2a562715adc3f6c8",
                    "ec49c852e6f31eedb332cc91ebe7ac90"
                ],
                "children" : [
                    "e40fa6b2c708d08246c048e3a6bdacef",
                    "a15cca6e62ab083cde3fb12a04e171a7",
                    "a9d013c279dbee7d2a562715adc3f6c8",
                    "ec49c852e6f31eedb332cc91ebe7ac90"
                ],
                "parents" : [
                    "#"
                ],
                "data" : null,
                "state" : {

                },
                "a_attr" : {
                    "href" : "#"
                },
                "li_attr" : {
                    "id" : "1"
                },
                "icon" : true,
                "text" : "Ajuda",
                "id" : "1"
            },
            {
                "parent" : "1",
                "children_d" : [
                    "fe0cc6c3abb85023422421fcd6ed3446",
                    "d3cea25408e238e5143f34bc24e16ef5",
                    "33c573f5f1446718fb5d25fb47319b28",
                    "199a86a9ec2cd637adb0db6ab9977064",
                    "15532b48643a1c0bc91d46ce2e21b53f",
                    "6b8a4756ff926835765715057ae4d240",
                    "d7dd271b8a6b2a72d9ca975ff0b867ec",
                    "af1bd9c82d9a3a1352ea60db87193a7a",
                    "9e01641e6d6c85d62e98f4e9784640cf",
                    "f263673d4cb28a3bd2bd6b27a589d5c9",
                    "d92a30048a1114d4d6d3f0c1fc066b66",
                    "25e770d9fbca8d00b3347a04897b56a0",
                    "dfe2854d1b9909247a56372273fe749d",
                    "cca6c536ec85b86105b3013c1d5321cb",
                    "ec37d84ed96a03791c78127014605d84"
                ],
                "children" : [
                    "fe0cc6c3abb85023422421fcd6ed3446",
                    "d3cea25408e238e5143f34bc24e16ef5",
                    "33c573f5f1446718fb5d25fb47319b28",
                    "199a86a9ec2cd637adb0db6ab9977064",
                    "15532b48643a1c0bc91d46ce2e21b53f",
                    "6b8a4756ff926835765715057ae4d240",
                    "d7dd271b8a6b2a72d9ca975ff0b867ec",
                    "af1bd9c82d9a3a1352ea60db87193a7a",
                    "9e01641e6d6c85d62e98f4e9784640cf",
                    "f263673d4cb28a3bd2bd6b27a589d5c9",
                    "d92a30048a1114d4d6d3f0c1fc066b66",
                    "25e770d9fbca8d00b3347a04897b56a0",
                    "dfe2854d1b9909247a56372273fe749d",
                    "cca6c536ec85b86105b3013c1d5321cb",
                    "ec37d84ed96a03791c78127014605d84"
                ],
                "parents" : [
                    "1",
                    "#"
                ],
                "data" : null,
                "state" : {

                },
                "a_attr" : {
                    "href" : "#"
                },
                "li_attr" : {
                    "id" : "e40fa6b2c708d08246c048e3a6bdacef"
                },
                "icon" : true,
                "text" : "Recrutador",
                "id" : "e40fa6b2c708d08246c048e3a6bdacef"
            },
            {
                "parent" : "e40fa6b2c708d08246c048e3a6bdacef",
                "children_d" : [

                ],
                "children" : [

                ],
                "parents" : [
                    "e40fa6b2c708d08246c048e3a6bdacef",
                    "1",
                    "#"
                ],
                "data" : null,
                "state" : {

                },
                "a_attr" : {
                    "href" : "#"
                },
                "li_attr" : {
                    "id" : "fe0cc6c3abb85023422421fcd6ed3446"
                },
                "icon" : true,
                "text" : "Cadastramento",
                "id" : "fe0cc6c3abb85023422421fcd6ed3446"
            },
            {
                "parent" : "e40fa6b2c708d08246c048e3a6bdacef",
                "children_d" : [

                ],
                "children" : [

                ],
                "parents" : [
                    "e40fa6b2c708d08246c048e3a6bdacef",
                    "1",
                    "#"
                ],
                "data" : null,
                "state" : {

                },
                "a_attr" : {
                    "href" : "#"
                },
                "li_attr" : {
                    "id" : "d3cea25408e238e5143f34bc24e16ef5"
                },
                "icon" : true,
                "text" : "Cadastramento com Sucesso",
                "id" : "d3cea25408e238e5143f34bc24e16ef5"
            },
            {
                "parent" : "e40fa6b2c708d08246c048e3a6bdacef",
                "children_d" : [

                ],
                "children" : [

                ],
                "parents" : [
                    "e40fa6b2c708d08246c048e3a6bdacef",
                    "1",
                    "#"
                ],
                "data" : null,
                "state" : {

                },
                "a_attr" : {
                    "href" : "#"
                },
                "li_attr" : {
                    "id" : "33c573f5f1446718fb5d25fb47319b28"
                },
                "icon" : true,
                "text" : "Editar Perfil Recrutador",
                "id" : "33c573f5f1446718fb5d25fb47319b28"
            },
            {
                "parent" : "e40fa6b2c708d08246c048e3a6bdacef",
                "children_d" : [

                ],
                "children" : [

                ],
                "parents" : [
                    "e40fa6b2c708d08246c048e3a6bdacef",
                    "1",
                    "#"
                ],
                "data" : null,
                "state" : {

                },
                "a_attr" : {
                    "href" : "#"
                },
                "li_attr" : {
                    "id" : "199a86a9ec2cd637adb0db6ab9977064"
                },
                "icon" : true,
                "text" : "Dados da Empresa",
                "id" : "199a86a9ec2cd637adb0db6ab9977064"
            },
            {
                "parent" : "e40fa6b2c708d08246c048e3a6bdacef",
                "children_d" : [

                ],
                "children" : [

                ],
                "parents" : [
                    "e40fa6b2c708d08246c048e3a6bdacef",
                    "1",
                    "#"
                ],
                "data" : null,
                "state" : {

                },
                "a_attr" : {
                    "href" : "#"
                },
                "li_attr" : {
                    "id" : "15532b48643a1c0bc91d46ce2e21b53f"
                },
                "icon" : true,
                "text" : "Criar Nova Vaga",
                "id" : "15532b48643a1c0bc91d46ce2e21b53f"
            },
            {
                "parent" : "e40fa6b2c708d08246c048e3a6bdacef",
                "children_d" : [

                ],
                "children" : [

                ],
                "parents" : [
                    "e40fa6b2c708d08246c048e3a6bdacef",
                    "1",
                    "#"
                ],
                "data" : null,
                "state" : {

                },
                "a_attr" : {
                    "href" : "#"
                },
                "li_attr" : {
                    "id" : "6b8a4756ff926835765715057ae4d240"
                },
                "icon" : true,
                "text" : "Minhas Vagas",
                "id" : "6b8a4756ff926835765715057ae4d240"
            },
            {
                "parent" : "e40fa6b2c708d08246c048e3a6bdacef",
                "children_d" : [

                ],
                "children" : [

                ],
                "parents" : [
                    "e40fa6b2c708d08246c048e3a6bdacef",
                    "1",
                    "#"
                ],
                "data" : null,
                "state" : {

                },
                "a_attr" : {
                    "href" : "#"
                },
                "li_attr" : {
                    "id" : "d7dd271b8a6b2a72d9ca975ff0b867ec"
                },
                "icon" : true,
                "text" : "Editar Vaga",
                "id" : "d7dd271b8a6b2a72d9ca975ff0b867ec"
            },
            {
                "parent" : "e40fa6b2c708d08246c048e3a6bdacef",
                "children_d" : [

                ],
                "children" : [

                ],
                "parents" : [
                    "e40fa6b2c708d08246c048e3a6bdacef",
                    "1",
                    "#"
                ],
                "data" : null,
                "state" : {

                },
                "a_attr" : {
                    "href" : "#"
                },
                "li_attr" : {
                    "id" : "af1bd9c82d9a3a1352ea60db87193a7a"
                },
                "icon" : true,
                "text" : "Buscar currículos",
                "id" : "af1bd9c82d9a3a1352ea60db87193a7a"
            },
            {
                "parent" : "e40fa6b2c708d08246c048e3a6bdacef",
                "children_d" : [

                ],
                "children" : [

                ],
                "parents" : [
                    "e40fa6b2c708d08246c048e3a6bdacef",
                    "1",
                    "#"
                ],
                "data" : null,
                "state" : {

                },
                "a_attr" : {
                    "href" : "#"
                },
                "li_attr" : {
                    "id" : "9e01641e6d6c85d62e98f4e9784640cf"
                },
                "icon" : true,
                "text" : "Visualizar Currículo",
                "id" : "9e01641e6d6c85d62e98f4e9784640cf"
            },
            {
                "parent" : "e40fa6b2c708d08246c048e3a6bdacef",
                "children_d" : [

                ],
                "children" : [

                ],
                "parents" : [
                    "e40fa6b2c708d08246c048e3a6bdacef",
                    "1",
                    "#"
                ],
                "data" : null,
                "state" : {

                },
                "a_attr" : {
                    "href" : "#"
                },
                "li_attr" : {
                    "id" : "f263673d4cb28a3bd2bd6b27a589d5c9"
                },
                "icon" : true,
                "text" : "Processo de Seleção",
                "id" : "f263673d4cb28a3bd2bd6b27a589d5c9"
            },
            {
                "parent" : "e40fa6b2c708d08246c048e3a6bdacef",
                "children_d" : [

                ],
                "children" : [

                ],
                "parents" : [
                    "e40fa6b2c708d08246c048e3a6bdacef",
                    "1",
                    "#"
                ],
                "data" : null,
                "state" : {

                },
                "a_attr" : {
                    "href" : "#"
                },
                "li_attr" : {
                    "id" : "d92a30048a1114d4d6d3f0c1fc066b66"
                },
                "icon" : true,
                "text" : "Currículo no Processo de Seleção",
                "id" : "d92a30048a1114d4d6d3f0c1fc066b66"
            },
            {
                "parent" : "e40fa6b2c708d08246c048e3a6bdacef",
                "children_d" : [

                ],
                "children" : [

                ],
                "parents" : [
                    "e40fa6b2c708d08246c048e3a6bdacef",
                    "1",
                    "#"
                ],
                "data" : null,
                "state" : {

                },
                "a_attr" : {
                    "href" : "#"
                },
                "li_attr" : {
                    "id" : "25e770d9fbca8d00b3347a04897b56a0"
                },
                "icon" : true,
                "text" : "Página da Empresa",
                "id" : "25e770d9fbca8d00b3347a04897b56a0"
            },
            {
                "parent" : "e40fa6b2c708d08246c048e3a6bdacef",
                "children_d" : [

                ],
                "children" : [

                ],
                "parents" : [
                    "e40fa6b2c708d08246c048e3a6bdacef",
                    "1",
                    "#"
                ],
                "data" : null,
                "state" : {

                },
                "a_attr" : {
                    "href" : "#"
                },
                "li_attr" : {
                    "id" : "dfe2854d1b9909247a56372273fe749d"
                },
                "icon" : true,
                "text" : "Configurar Página da Empresa",
                "id" : "dfe2854d1b9909247a56372273fe749d"
            },
            {
                "parent" : "e40fa6b2c708d08246c048e3a6bdacef",
                "children_d" : [

                ],
                "children" : [

                ],
                "parents" : [
                    "e40fa6b2c708d08246c048e3a6bdacef",
                    "1",
                    "#"
                ],
                "data" : null,
                "state" : {

                },
                "a_attr" : {
                    "href" : "#"
                },
                "li_attr" : {
                    "id" : "cca6c536ec85b86105b3013c1d5321cb"
                },
                "icon" : true,
                "text" : "Tornar-se Profissional",
                "id" : "cca6c536ec85b86105b3013c1d5321cb"
            },
            {
                "parent" : "e40fa6b2c708d08246c048e3a6bdacef",
                "children_d" : [

                ],
                "children" : [

                ],
                "parents" : [
                    "e40fa6b2c708d08246c048e3a6bdacef",
                    "1",
                    "#"
                ],
                "data" : null,
                "state" : {

                },
                "a_attr" : {
                    "href" : "#"
                },
                "li_attr" : {
                    "id" : "ec37d84ed96a03791c78127014605d84"
                },
                "icon" : true,
                "text" : "Deixar de Ser Recrutador",
                "id" : "ec37d84ed96a03791c78127014605d84"
            },
            {
                "parent" : "1",
                "children_d" : [
                    "0391b5d5f9b374854f042d016a697d55",
                    "7a5cecf0790dbafd269d60a00764a3d5",
                    "607a7c108cf6c5cdf4fa5fe0b82ea629",
                    "403968b638de3b50b92b26d4b5f5efa8",
                    "c992e37cce2f683c5c39dda9f5bf542c",
                    "94828b2107e9c5143ac8f4bba83e35ba",
                    "7069d6df62d608ff3d2ef2f0adfea2fa",
                    "4468f963069516fe2a1483fd39981f65",
                    "4cecdf078819bea8fb9a4082c569fdc5",
                    "34fbd0d689db3335408563ac8a29d453",
                    "b87abe0dd15c0cd94799938e5ec46d68",
                    "ee7cc57dc1db680baf38093ac5d50b47",
                    "e60ca50ff3d315f85ef4ac948a8dca8b",
                    "ba21c668394d487fc1192daf0e26f323",
                    "ced2debb7b85ee7fb98f3aaeb1abcf27",
                    "5780d6e232072191fce417bf3ee28841"
                ],
                "children" : [
                    "0391b5d5f9b374854f042d016a697d55",
                    "7a5cecf0790dbafd269d60a00764a3d5",
                    "607a7c108cf6c5cdf4fa5fe0b82ea629",
                    "403968b638de3b50b92b26d4b5f5efa8",
                    "c992e37cce2f683c5c39dda9f5bf542c",
                    "94828b2107e9c5143ac8f4bba83e35ba",
                    "7069d6df62d608ff3d2ef2f0adfea2fa",
                    "4468f963069516fe2a1483fd39981f65",
                    "4cecdf078819bea8fb9a4082c569fdc5",
                    "34fbd0d689db3335408563ac8a29d453",
                    "b87abe0dd15c0cd94799938e5ec46d68",
                    "ee7cc57dc1db680baf38093ac5d50b47",
                    "e60ca50ff3d315f85ef4ac948a8dca8b",
                    "ba21c668394d487fc1192daf0e26f323",
                    "ced2debb7b85ee7fb98f3aaeb1abcf27",
                    "5780d6e232072191fce417bf3ee28841"
                ],
                "parents" : [
                    "1",
                    "#"
                ],
                "data" : null,
                "state" : {

                },
                "a_attr" : {
                    "href" : "#"
                },
                "li_attr" : {
                    "id" : "a15cca6e62ab083cde3fb12a04e171a7"
                },
                "icon" : true,
                "text" : "Profissional",
                "id" : "a15cca6e62ab083cde3fb12a04e171a7"
            },
            {
                "parent" : "a15cca6e62ab083cde3fb12a04e171a7",
                "children_d" : [

                ],
                "children" : [

                ],
                "parents" : [
                    "a15cca6e62ab083cde3fb12a04e171a7",
                    "1",
                    "#"
                ],
                "data" : null,
                "state" : {

                },
                "a_attr" : {
                    "href" : "#"
                },
                "li_attr" : {
                    "id" : "0391b5d5f9b374854f042d016a697d55"
                },
                "icon" : true,
                "text" : "Cadastramento",
                "id" : "0391b5d5f9b374854f042d016a697d55"
            },
            {
                "parent" : "a15cca6e62ab083cde3fb12a04e171a7",
                "children_d" : [

                ],
                "children" : [

                ],
                "parents" : [
                    "a15cca6e62ab083cde3fb12a04e171a7",
                    "1",
                    "#"
                ],
                "data" : null,
                "state" : {

                },
                "a_attr" : {
                    "href" : "#"
                },
                "li_attr" : {
                    "id" : "7a5cecf0790dbafd269d60a00764a3d5"
                },
                "icon" : true,
                "text" : "Cadastramento com Sucesso",
                "id" : "7a5cecf0790dbafd269d60a00764a3d5"
            },
            {
                "parent" : "a15cca6e62ab083cde3fb12a04e171a7",
                "children_d" : [

                ],
                "children" : [

                ],
                "parents" : [
                    "a15cca6e62ab083cde3fb12a04e171a7",
                    "1",
                    "#"
                ],
                "data" : null,
                "state" : {

                },
                "a_attr" : {
                    "href" : "#"
                },
                "li_attr" : {
                    "id" : "607a7c108cf6c5cdf4fa5fe0b82ea629"
                },
                "icon" : true,
                "text" : "Criar Novo Currículo",
                "id" : "607a7c108cf6c5cdf4fa5fe0b82ea629"
            },
            {
                "parent" : "a15cca6e62ab083cde3fb12a04e171a7",
                "children_d" : [

                ],
                "children" : [

                ],
                "parents" : [
                    "a15cca6e62ab083cde3fb12a04e171a7",
                    "1",
                    "#"
                ],
                "data" : null,
                "state" : {

                },
                "a_attr" : {
                    "href" : "#"
                },
                "li_attr" : {
                    "id" : "403968b638de3b50b92b26d4b5f5efa8"
                },
                "icon" : true,
                "text" : "Meus Currículos",
                "id" : "403968b638de3b50b92b26d4b5f5efa8"
            },
            {
                "parent" : "a15cca6e62ab083cde3fb12a04e171a7",
                "children_d" : [

                ],
                "children" : [

                ],
                "parents" : [
                    "a15cca6e62ab083cde3fb12a04e171a7",
                    "1",
                    "#"
                ],
                "data" : null,
                "state" : {

                },
                "a_attr" : {
                    "href" : "#"
                },
                "li_attr" : {
                    "id" : "c992e37cce2f683c5c39dda9f5bf542c"
                },
                "icon" : true,
                "text" : "Editar Currículo",
                "id" : "c992e37cce2f683c5c39dda9f5bf542c"
            },
            {
                "parent" : "a15cca6e62ab083cde3fb12a04e171a7",
                "children_d" : [

                ],
                "children" : [

                ],
                "parents" : [
                    "a15cca6e62ab083cde3fb12a04e171a7",
                    "1",
                    "#"
                ],
                "data" : null,
                "state" : {

                },
                "a_attr" : {
                    "href" : "#"
                },
                "li_attr" : {
                    "id" : "94828b2107e9c5143ac8f4bba83e35ba"
                },
                "icon" : true,
                "text" : "Criar Carta de Apresentação",
                "id" : "94828b2107e9c5143ac8f4bba83e35ba"
            },
            {
                "parent" : "a15cca6e62ab083cde3fb12a04e171a7",
                "children_d" : [

                ],
                "children" : [

                ],
                "parents" : [
                    "a15cca6e62ab083cde3fb12a04e171a7",
                    "1",
                    "#"
                ],
                "data" : null,
                "state" : {

                },
                "a_attr" : {
                    "href" : "#"
                },
                "li_attr" : {
                    "id" : "7069d6df62d608ff3d2ef2f0adfea2fa"
                },
                "icon" : true,
                "text" : "Minhas Cartas de Apresentação",
                "id" : "7069d6df62d608ff3d2ef2f0adfea2fa"
            },
            {
                "parent" : "a15cca6e62ab083cde3fb12a04e171a7",
                "children_d" : [

                ],
                "children" : [

                ],
                "parents" : [
                    "a15cca6e62ab083cde3fb12a04e171a7",
                    "1",
                    "#"
                ],
                "data" : null,
                "state" : {

                },
                "a_attr" : {
                    "href" : "#"
                },
                "li_attr" : {
                    "id" : "4468f963069516fe2a1483fd39981f65"
                },
                "icon" : true,
                "text" : "Editar Carta de Apresentação",
                "id" : "4468f963069516fe2a1483fd39981f65"
            },
            {
                "parent" : "a15cca6e62ab083cde3fb12a04e171a7",
                "children_d" : [

                ],
                "children" : [

                ],
                "parents" : [
                    "a15cca6e62ab083cde3fb12a04e171a7",
                    "1",
                    "#"
                ],
                "data" : null,
                "state" : {

                },
                "a_attr" : {
                    "href" : "#"
                },
                "li_attr" : {
                    "id" : "4cecdf078819bea8fb9a4082c569fdc5"
                },
                "icon" : true,
                "text" : "Visualizar Carta de Apresentação",
                "id" : "4cecdf078819bea8fb9a4082c569fdc5"
            },
            {
                "parent" : "a15cca6e62ab083cde3fb12a04e171a7",
                "children_d" : [

                ],
                "children" : [

                ],
                "parents" : [
                    "a15cca6e62ab083cde3fb12a04e171a7",
                    "1",
                    "#"
                ],
                "data" : null,
                "state" : {

                },
                "a_attr" : {
                    "href" : "#"
                },
                "li_attr" : {
                    "id" : "34fbd0d689db3335408563ac8a29d453"
                },
                "icon" : true,
                "text" : "Buscar Vagas",
                "id" : "34fbd0d689db3335408563ac8a29d453"
            },
            {
                "parent" : "a15cca6e62ab083cde3fb12a04e171a7",
                "children_d" : [

                ],
                "children" : [

                ],
                "parents" : [
                    "a15cca6e62ab083cde3fb12a04e171a7",
                    "1",
                    "#"
                ],
                "data" : null,
                "state" : {

                },
                "a_attr" : {
                    "href" : "#"
                },
                "li_attr" : {
                    "id" : "b87abe0dd15c0cd94799938e5ec46d68"
                },
                "icon" : true,
                "text" : "Cesta de Vagas",
                "id" : "b87abe0dd15c0cd94799938e5ec46d68"
            },
            {
                "parent" : "a15cca6e62ab083cde3fb12a04e171a7",
                "children_d" : [

                ],
                "children" : [

                ],
                "parents" : [
                    "a15cca6e62ab083cde3fb12a04e171a7",
                    "1",
                    "#"
                ],
                "data" : null,
                "state" : {

                },
                "a_attr" : {
                    "href" : "#"
                },
                "li_attr" : {
                    "id" : "ee7cc57dc1db680baf38093ac5d50b47"
                },
                "icon" : true,
                "text" : "Vagas Recomendadas",
                "id" : "ee7cc57dc1db680baf38093ac5d50b47"
            },
            {
                "parent" : "a15cca6e62ab083cde3fb12a04e171a7",
                "children_d" : [

                ],
                "children" : [

                ],
                "parents" : [
                    "a15cca6e62ab083cde3fb12a04e171a7",
                    "1",
                    "#"
                ],
                "data" : null,
                "state" : {

                },
                "a_attr" : {
                    "href" : "#"
                },
                "li_attr" : {
                    "id" : "e60ca50ff3d315f85ef4ac948a8dca8b"
                },
                "icon" : true,
                "text" : "Vagas Candidatadas",
                "id" : "e60ca50ff3d315f85ef4ac948a8dca8b"
            },
            {
                "parent" : "a15cca6e62ab083cde3fb12a04e171a7",
                "children_d" : [

                ],
                "children" : [

                ],
                "parents" : [
                    "a15cca6e62ab083cde3fb12a04e171a7",
                    "1",
                    "#"
                ],
                "data" : null,
                "state" : {

                },
                "a_attr" : {
                    "href" : "#"
                },
                "li_attr" : {
                    "id" : "ba21c668394d487fc1192daf0e26f323"
                },
                "icon" : true,
                "text" : "Candidatar-se a uma Vaga",
                "id" : "ba21c668394d487fc1192daf0e26f323"
            },
            {
                "parent" : "a15cca6e62ab083cde3fb12a04e171a7",
                "children_d" : [

                ],
                "children" : [

                ],
                "parents" : [
                    "a15cca6e62ab083cde3fb12a04e171a7",
                    "1",
                    "#"
                ],
                "data" : null,
                "state" : {

                },
                "a_attr" : {
                    "href" : "#"
                },
                "li_attr" : {
                    "id" : "ced2debb7b85ee7fb98f3aaeb1abcf27"
                },
                "icon" : true,
                "text" : "Imprimir Currículos",
                "id" : "ced2debb7b85ee7fb98f3aaeb1abcf27"
            },
            {
                "parent" : "a15cca6e62ab083cde3fb12a04e171a7",
                "children_d" : [

                ],
                "children" : [

                ],
                "parents" : [
                    "a15cca6e62ab083cde3fb12a04e171a7",
                    "1",
                    "#"
                ],
                "data" : null,
                "state" : {

                },
                "a_attr" : {
                    "href" : "#"
                },
                "li_attr" : {
                    "id" : "5780d6e232072191fce417bf3ee28841"
                },
                "icon" : true,
                "text" : "Tornar-se Recrutador",
                "id" : "5780d6e232072191fce417bf3ee28841"
            },
            {
                "parent" : "1",
                "children_d" : [
                    "cda21cbc4092fd55a2356fb742918f17",
                    "23d475cd87aaae427ad5ce4b19aa18ef",
                    "a79d33c98ce5f435625d54545b41b224",
                    "82b6371a3b4c9b293a11e2b4e264c319",
                    "8b2fcd729d00b648350e2f21114caef0",
                    "0b25aee33c1e4a214e44986fa0e186c1",
                    "0ebd078607e2acbb520de216db36487f",
                    "3e0514449b0fef556d70ca2ba5ce2d6c",
                    "a75d6da0184ad89b168042e5e20bc5d1",
                    "d1cc1a413420a7721eba692a877b8fed",
                    "338018ecf3c8ddbadd72c4049f42dca9",
                    "83b7e67b96548217d5a1bd465d16941c",
                    "f46041daadbd51f94ecaf765d63c15b6",
                    "2cf8fdfa9e43d33357734276011824a0",
                    "f6812f1e7119d69cb4a429fa70182ccc",
                    "fe684377d80697154e301a503e1d9b53",
                    "c9f71de0aa30d48451771a587a0f7007",
                    "f998ccb6508dd98147561e3be53f5e4c",
                    "02d0efc85390dc6b48d777ecf8bb3d4a",
                    "ab3b768ba769aed6c7c3f6a29914d158",
                    "8e49300a2176751be58fc4d5e7b67cd7",
                    "6d2043bfc2cc762f071f6cb3d6cfebbd"
                ],
                "children" : [
                    "cda21cbc4092fd55a2356fb742918f17",
                    "23d475cd87aaae427ad5ce4b19aa18ef",
                    "a79d33c98ce5f435625d54545b41b224",
                    "82b6371a3b4c9b293a11e2b4e264c319",
                    "8b2fcd729d00b648350e2f21114caef0",
                    "0b25aee33c1e4a214e44986fa0e186c1",
                    "0ebd078607e2acbb520de216db36487f",
                    "3e0514449b0fef556d70ca2ba5ce2d6c",
                    "a75d6da0184ad89b168042e5e20bc5d1",
                    "d1cc1a413420a7721eba692a877b8fed",
                    "338018ecf3c8ddbadd72c4049f42dca9",
                    "83b7e67b96548217d5a1bd465d16941c",
                    "f46041daadbd51f94ecaf765d63c15b6",
                    "2cf8fdfa9e43d33357734276011824a0",
                    "f6812f1e7119d69cb4a429fa70182ccc",
                    "fe684377d80697154e301a503e1d9b53",
                    "c9f71de0aa30d48451771a587a0f7007",
                    "f998ccb6508dd98147561e3be53f5e4c",
                    "02d0efc85390dc6b48d777ecf8bb3d4a",
                    "ab3b768ba769aed6c7c3f6a29914d158",
                    "8e49300a2176751be58fc4d5e7b67cd7",
                    "6d2043bfc2cc762f071f6cb3d6cfebbd"
                ],
                "parents" : [
                    "1",
                    "#"
                ],
                "data" : null,
                "state" : {

                },
                "a_attr" : {
                    "href" : "#"
                },
                "li_attr" : {
                    "id" : "a9d013c279dbee7d2a562715adc3f6c8"
                },
                "icon" : true,
                "text" : "+emprego.net",
                "id" : "a9d013c279dbee7d2a562715adc3f6c8"
            },
            {
                "parent" : "a9d013c279dbee7d2a562715adc3f6c8",
                "children_d" : [

                ],
                "children" : [

                ],
                "parents" : [
                    "a9d013c279dbee7d2a562715adc3f6c8",
                    "1",
                    "#"
                ],
                "data" : null,
                "state" : {

                },
                "a_attr" : {
                    "href" : "#"
                },
                "li_attr" : {
                    "id" : "cda21cbc4092fd55a2356fb742918f17"
                },
                "icon" : true,
                "text" : "Cadastramento",
                "id" : "cda21cbc4092fd55a2356fb742918f17"
            },
            {
                "parent" : "a9d013c279dbee7d2a562715adc3f6c8",
                "children_d" : [

                ],
                "children" : [

                ],
                "parents" : [
                    "a9d013c279dbee7d2a562715adc3f6c8",
                    "1",
                    "#"
                ],
                "data" : null,
                "state" : {

                },
                "a_attr" : {
                    "href" : "#"
                },
                "li_attr" : {
                    "id" : "23d475cd87aaae427ad5ce4b19aa18ef"
                },
                "icon" : true,
                "text" : "Cadastramento com Sucesso",
                "id" : "23d475cd87aaae427ad5ce4b19aa18ef"
            },
            {
                "parent" : "a9d013c279dbee7d2a562715adc3f6c8",
                "children_d" : [

                ],
                "children" : [

                ],
                "parents" : [
                    "a9d013c279dbee7d2a562715adc3f6c8",
                    "1",
                    "#"
                ],
                "data" : null,
                "state" : {

                },
                "a_attr" : {
                    "href" : "#"
                },
                "li_attr" : {
                    "id" : "a79d33c98ce5f435625d54545b41b224"
                },
                "icon" : true,
                "text" : "Criar Classificados",
                "id" : "a79d33c98ce5f435625d54545b41b224"
            },
            {
                "parent" : "a9d013c279dbee7d2a562715adc3f6c8",
                "children_d" : [

                ],
                "children" : [

                ],
                "parents" : [
                    "a9d013c279dbee7d2a562715adc3f6c8",
                    "1",
                    "#"
                ],
                "data" : null,
                "state" : {

                },
                "a_attr" : {
                    "href" : "#"
                },
                "li_attr" : {
                    "id" : "82b6371a3b4c9b293a11e2b4e264c319"
                },
                "icon" : true,
                "text" : "Editar Classificado",
                "id" : "82b6371a3b4c9b293a11e2b4e264c319"
            },
            {
                "parent" : "a9d013c279dbee7d2a562715adc3f6c8",
                "children_d" : [

                ],
                "children" : [

                ],
                "parents" : [
                    "a9d013c279dbee7d2a562715adc3f6c8",
                    "1",
                    "#"
                ],
                "data" : null,
                "state" : {

                },
                "a_attr" : {
                    "href" : "#"
                },
                "li_attr" : {
                    "id" : "8b2fcd729d00b648350e2f21114caef0"
                },
                "icon" : true,
                "text" : "Meus Classificados",
                "id" : "8b2fcd729d00b648350e2f21114caef0"
            },
            {
                "parent" : "a9d013c279dbee7d2a562715adc3f6c8",
                "children_d" : [

                ],
                "children" : [

                ],
                "parents" : [
                    "a9d013c279dbee7d2a562715adc3f6c8",
                    "1",
                    "#"
                ],
                "data" : null,
                "state" : {

                },
                "a_attr" : {
                    "href" : "#"
                },
                "li_attr" : {
                    "id" : "0b25aee33c1e4a214e44986fa0e186c1"
                },
                "icon" : true,
                "text" : "Buscar Classificados",
                "id" : "0b25aee33c1e4a214e44986fa0e186c1"
            },
            {
                "parent" : "a9d013c279dbee7d2a562715adc3f6c8",
                "children_d" : [

                ],
                "children" : [

                ],
                "parents" : [
                    "a9d013c279dbee7d2a562715adc3f6c8",
                    "1",
                    "#"
                ],
                "data" : null,
                "state" : {

                },
                "a_attr" : {
                    "href" : "#"
                },
                "li_attr" : {
                    "id" : "0ebd078607e2acbb520de216db36487f"
                },
                "icon" : true,
                "text" : "Visualizar Classificado",
                "id" : "0ebd078607e2acbb520de216db36487f"
            },
            {
                "parent" : "a9d013c279dbee7d2a562715adc3f6c8",
                "children_d" : [

                ],
                "children" : [

                ],
                "parents" : [
                    "a9d013c279dbee7d2a562715adc3f6c8",
                    "1",
                    "#"
                ],
                "data" : null,
                "state" : {

                },
                "a_attr" : {
                    "href" : "#"
                },
                "li_attr" : {
                    "id" : "3e0514449b0fef556d70ca2ba5ce2d6c"
                },
                "icon" : true,
                "text" : "Perfil Social",
                "id" : "3e0514449b0fef556d70ca2ba5ce2d6c"
            },
            {
                "parent" : "a9d013c279dbee7d2a562715adc3f6c8",
                "children_d" : [

                ],
                "children" : [

                ],
                "parents" : [
                    "a9d013c279dbee7d2a562715adc3f6c8",
                    "1",
                    "#"
                ],
                "data" : null,
                "state" : {

                },
                "a_attr" : {
                    "href" : "#"
                },
                "li_attr" : {
                    "id" : "a75d6da0184ad89b168042e5e20bc5d1"
                },
                "icon" : true,
                "text" : "Contatos",
                "id" : "a75d6da0184ad89b168042e5e20bc5d1"
            },
            {
                "parent" : "a9d013c279dbee7d2a562715adc3f6c8",
                "children_d" : [

                ],
                "children" : [

                ],
                "parents" : [
                    "a9d013c279dbee7d2a562715adc3f6c8",
                    "1",
                    "#"
                ],
                "data" : null,
                "state" : {

                },
                "a_attr" : {
                    "href" : "#"
                },
                "li_attr" : {
                    "id" : "d1cc1a413420a7721eba692a877b8fed"
                },
                "icon" : true,
                "text" : "Buscar Contatos",
                "id" : "d1cc1a413420a7721eba692a877b8fed"
            },
            {
                "parent" : "a9d013c279dbee7d2a562715adc3f6c8",
                "children_d" : [

                ],
                "children" : [

                ],
                "parents" : [
                    "a9d013c279dbee7d2a562715adc3f6c8",
                    "1",
                    "#"
                ],
                "data" : null,
                "state" : {

                },
                "a_attr" : {
                    "href" : "#"
                },
                "li_attr" : {
                    "id" : "338018ecf3c8ddbadd72c4049f42dca9"
                },
                "icon" : true,
                "text" : "Gerenciar Recomendações",
                "id" : "338018ecf3c8ddbadd72c4049f42dca9"
            },
            {
                "parent" : "a9d013c279dbee7d2a562715adc3f6c8",
                "children_d" : [

                ],
                "children" : [

                ],
                "parents" : [
                    "a9d013c279dbee7d2a562715adc3f6c8",
                    "1",
                    "#"
                ],
                "data" : null,
                "state" : {

                },
                "a_attr" : {
                    "href" : "#"
                },
                "li_attr" : {
                    "id" : "83b7e67b96548217d5a1bd465d16941c"
                },
                "icon" : true,
                "text" : "Criar Grupo",
                "id" : "83b7e67b96548217d5a1bd465d16941c"
            },
            {
                "parent" : "a9d013c279dbee7d2a562715adc3f6c8",
                "children_d" : [

                ],
                "children" : [

                ],
                "parents" : [
                    "a9d013c279dbee7d2a562715adc3f6c8",
                    "1",
                    "#"
                ],
                "data" : null,
                "state" : {

                },
                "a_attr" : {
                    "href" : "#"
                },
                "li_attr" : {
                    "id" : "f46041daadbd51f94ecaf765d63c15b6"
                },
                "icon" : true,
                "text" : "Meus Grupos",
                "id" : "f46041daadbd51f94ecaf765d63c15b6"
            },
            {
                "parent" : "a9d013c279dbee7d2a562715adc3f6c8",
                "children_d" : [

                ],
                "children" : [

                ],
                "parents" : [
                    "a9d013c279dbee7d2a562715adc3f6c8",
                    "1",
                    "#"
                ],
                "data" : null,
                "state" : {

                },
                "a_attr" : {
                    "href" : "#"
                },
                "li_attr" : {
                    "id" : "2cf8fdfa9e43d33357734276011824a0"
                },
                "icon" : true,
                "text" : "Editar Grupo",
                "id" : "2cf8fdfa9e43d33357734276011824a0"
            },
            {
                "parent" : "a9d013c279dbee7d2a562715adc3f6c8",
                "children_d" : [

                ],
                "children" : [

                ],
                "parents" : [
                    "a9d013c279dbee7d2a562715adc3f6c8",
                    "1",
                    "#"
                ],
                "data" : null,
                "state" : {

                },
                "a_attr" : {
                    "href" : "#"
                },
                "li_attr" : {
                    "id" : "f6812f1e7119d69cb4a429fa70182ccc"
                },
                "icon" : true,
                "text" : "Buscar Grupos",
                "id" : "f6812f1e7119d69cb4a429fa70182ccc"
            },
            {
                "parent" : "a9d013c279dbee7d2a562715adc3f6c8",
                "children_d" : [

                ],
                "children" : [

                ],
                "parents" : [
                    "a9d013c279dbee7d2a562715adc3f6c8",
                    "1",
                    "#"
                ],
                "data" : null,
                "state" : {

                },
                "a_attr" : {
                    "href" : "#"
                },
                "li_attr" : {
                    "id" : "fe684377d80697154e301a503e1d9b53"
                },
                "icon" : true,
                "text" : "Perfil do Grupo",
                "id" : "fe684377d80697154e301a503e1d9b53"
            },
            {
                "parent" : "a9d013c279dbee7d2a562715adc3f6c8",
                "children_d" : [

                ],
                "children" : [

                ],
                "parents" : [
                    "a9d013c279dbee7d2a562715adc3f6c8",
                    "1",
                    "#"
                ],
                "data" : null,
                "state" : {

                },
                "a_attr" : {
                    "href" : "#"
                },
                "li_attr" : {
                    "id" : "c9f71de0aa30d48451771a587a0f7007"
                },
                "icon" : true,
                "text" : "Criar Tópico",
                "id" : "c9f71de0aa30d48451771a587a0f7007"
            },
            {
                "parent" : "a9d013c279dbee7d2a562715adc3f6c8",
                "children_d" : [

                ],
                "children" : [

                ],
                "parents" : [
                    "a9d013c279dbee7d2a562715adc3f6c8",
                    "1",
                    "#"
                ],
                "data" : null,
                "state" : {

                },
                "a_attr" : {
                    "href" : "#"
                },
                "li_attr" : {
                    "id" : "f998ccb6508dd98147561e3be53f5e4c"
                },
                "icon" : true,
                "text" : "Visualizar Tópico",
                "id" : "f998ccb6508dd98147561e3be53f5e4c"
            },
            {
                "parent" : "a9d013c279dbee7d2a562715adc3f6c8",
                "children_d" : [

                ],
                "children" : [

                ],
                "parents" : [
                    "a9d013c279dbee7d2a562715adc3f6c8",
                    "1",
                    "#"
                ],
                "data" : null,
                "state" : {

                },
                "a_attr" : {
                    "href" : "#"
                },
                "li_attr" : {
                    "id" : "02d0efc85390dc6b48d777ecf8bb3d4a"
                },
                "icon" : true,
                "text" : "Editar Tópico",
                "id" : "02d0efc85390dc6b48d777ecf8bb3d4a"
            },
            {
                "parent" : "a9d013c279dbee7d2a562715adc3f6c8",
                "children_d" : [

                ],
                "children" : [

                ],
                "parents" : [
                    "a9d013c279dbee7d2a562715adc3f6c8",
                    "1",
                    "#"
                ],
                "data" : null,
                "state" : {

                },
                "a_attr" : {
                    "href" : "#"
                },
                "li_attr" : {
                    "id" : "ab3b768ba769aed6c7c3f6a29914d158"
                },
                "icon" : true,
                "text" : "Perfil da Empresa",
                "id" : "ab3b768ba769aed6c7c3f6a29914d158"
            },
            {
                "parent" : "a9d013c279dbee7d2a562715adc3f6c8",
                "children_d" : [

                ],
                "children" : [

                ],
                "parents" : [
                    "a9d013c279dbee7d2a562715adc3f6c8",
                    "1",
                    "#"
                ],
                "data" : null,
                "state" : {

                },
                "a_attr" : {
                    "href" : "#"
                },
                "li_attr" : {
                    "id" : "8e49300a2176751be58fc4d5e7b67cd7"
                },
                "icon" : true,
                "text" : "Buscar Empresas",
                "id" : "8e49300a2176751be58fc4d5e7b67cd7"
            },
            {
                "parent" : "a9d013c279dbee7d2a562715adc3f6c8",
                "children_d" : [

                ],
                "children" : [

                ],
                "parents" : [
                    "a9d013c279dbee7d2a562715adc3f6c8",
                    "1",
                    "#"
                ],
                "data" : null,
                "state" : {

                },
                "a_attr" : {
                    "href" : "#"
                },
                "li_attr" : {
                    "id" : "6d2043bfc2cc762f071f6cb3d6cfebbd"
                },
                "icon" : true,
                "text" : "Gerenciar Conexões - Empresa",
                "id" : "6d2043bfc2cc762f071f6cb3d6cfebbd"
            },
            {
                "parent" : "1",
                "children_d" : [
                    "4ca09aa3e220b93d5a29bc2f6ff2bd2a",
                    "d0d41a5d0277f77119806e7ed6dafd68",
                    "a7885fe0a2964f918a46e4b502227ca7",
                    "48511030865ae29d8df225e1e8d55644",
                    "d66eea96b89f4ea751c1970f7c7a2a58",
                    "71c63b63153cc04baf567f338836b9ed",
                    "cf724e52a4e9311f63ba6d2cad7aafaa",
                    "f071b23db727687957ea52cbc46e06c3"
                ],
                "children" : [
                    "4ca09aa3e220b93d5a29bc2f6ff2bd2a",
                    "d0d41a5d0277f77119806e7ed6dafd68",
                    "a7885fe0a2964f918a46e4b502227ca7",
                    "48511030865ae29d8df225e1e8d55644",
                    "d66eea96b89f4ea751c1970f7c7a2a58",
                    "71c63b63153cc04baf567f338836b9ed",
                    "cf724e52a4e9311f63ba6d2cad7aafaa",
                    "f071b23db727687957ea52cbc46e06c3"
                ],
                "parents" : [
                    "1",
                    "#"
                ],
                "data" : null,
                "state" : {

                },
                "a_attr" : {
                    "href" : "#"
                },
                "li_attr" : {
                    "id" : "ec49c852e6f31eedb332cc91ebe7ac90"
                },
                "icon" : true,
                "text" : "Geral",
                "id" : "ec49c852e6f31eedb332cc91ebe7ac90"
            },
            {
                "parent" : "ec49c852e6f31eedb332cc91ebe7ac90",
                "children_d" : [

                ],
                "children" : [

                ],
                "parents" : [
                    "ec49c852e6f31eedb332cc91ebe7ac90",
                    "1",
                    "#"
                ],
                "data" : null,
                "state" : {

                },
                "a_attr" : {
                    "href" : "#"
                },
                "li_attr" : {
                    "id" : "4ca09aa3e220b93d5a29bc2f6ff2bd2a"
                },
                "icon" : true,
                "text" : "Editar Perfil",
                "id" : "4ca09aa3e220b93d5a29bc2f6ff2bd2a"
            },
            {
                "parent" : "ec49c852e6f31eedb332cc91ebe7ac90",
                "children_d" : [

                ],
                "children" : [

                ],
                "parents" : [
                    "ec49c852e6f31eedb332cc91ebe7ac90",
                    "1",
                    "#"
                ],
                "data" : null,
                "state" : {

                },
                "a_attr" : {
                    "href" : "#"
                },
                "li_attr" : {
                    "id" : "d0d41a5d0277f77119806e7ed6dafd68"
                },
                "icon" : true,
                "text" : "Mensagens",
                "id" : "d0d41a5d0277f77119806e7ed6dafd68"
            },
            {
                "parent" : "ec49c852e6f31eedb332cc91ebe7ac90",
                "children_d" : [

                ],
                "children" : [

                ],
                "parents" : [
                    "ec49c852e6f31eedb332cc91ebe7ac90",
                    "1",
                    "#"
                ],
                "data" : null,
                "state" : {

                },
                "a_attr" : {
                    "href" : "#"
                },
                "li_attr" : {
                    "id" : "a7885fe0a2964f918a46e4b502227ca7"
                },
                "icon" : true,
                "text" : "Agenda",
                "id" : "a7885fe0a2964f918a46e4b502227ca7"
            },
            {
                "parent" : "ec49c852e6f31eedb332cc91ebe7ac90",
                "children_d" : [

                ],
                "children" : [

                ],
                "parents" : [
                    "ec49c852e6f31eedb332cc91ebe7ac90",
                    "1",
                    "#"
                ],
                "data" : null,
                "state" : {

                },
                "a_attr" : {
                    "href" : "#"
                },
                "li_attr" : {
                    "id" : "48511030865ae29d8df225e1e8d55644"
                },
                "icon" : true,
                "text" : "Página de Login",
                "id" : "48511030865ae29d8df225e1e8d55644"
            },
            {
                "parent" : "ec49c852e6f31eedb332cc91ebe7ac90",
                "children_d" : [

                ],
                "children" : [

                ],
                "parents" : [
                    "ec49c852e6f31eedb332cc91ebe7ac90",
                    "1",
                    "#"
                ],
                "data" : null,
                "state" : {

                },
                "a_attr" : {
                    "href" : "#"
                },
                "li_attr" : {
                    "id" : "d66eea96b89f4ea751c1970f7c7a2a58"
                },
                "icon" : true,
                "text" : "Esqueci Minha Senha",
                "id" : "d66eea96b89f4ea751c1970f7c7a2a58"
            },
            {
                "parent" : "ec49c852e6f31eedb332cc91ebe7ac90",
                "children_d" : [

                ],
                "children" : [

                ],
                "parents" : [
                    "ec49c852e6f31eedb332cc91ebe7ac90",
                    "1",
                    "#"
                ],
                "data" : null,
                "state" : {

                },
                "a_attr" : {
                    "href" : "#"
                },
                "li_attr" : {
                    "id" : "71c63b63153cc04baf567f338836b9ed"
                },
                "icon" : true,
                "text" : "Recuperar Login e Senha",
                "id" : "71c63b63153cc04baf567f338836b9ed"
            },
            {
                "parent" : "ec49c852e6f31eedb332cc91ebe7ac90",
                "children_d" : [

                ],
                "children" : [

                ],
                "parents" : [
                    "ec49c852e6f31eedb332cc91ebe7ac90",
                    "1",
                    "#"
                ],
                "data" : null,
                "state" : {

                },
                "a_attr" : {
                    "href" : "#"
                },
                "li_attr" : {
                    "id" : "cf724e52a4e9311f63ba6d2cad7aafaa"
                },
                "icon" : true,
                "text" : "Lista de  Ícones",
                "id" : "cf724e52a4e9311f63ba6d2cad7aafaa"
            },
            {
                "parent" : "ec49c852e6f31eedb332cc91ebe7ac90",
                "children_d" : [

                ],
                "children" : [

                ],
                "parents" : [
                    "ec49c852e6f31eedb332cc91ebe7ac90",
                    "1",
                    "#"
                ],
                "data" : null,
                "state" : {

                },
                "a_attr" : {
                    "href" : "#"
                },
                "li_attr" : {
                    "id" : "f071b23db727687957ea52cbc46e06c3"
                },
                "icon" : true,
                "text" : "Ajuda",
                "id" : "f071b23db727687957ea52cbc46e06c3"
            },
            {
                "parent" : "#",
                "children_d" : [
                    "8c6ef6d9de6027333d5493c2db9b5bed",
                    "e268cf7c411ca97601dd2efdf962b93b"
                ],
                "children" : [
                    "e268cf7c411ca97601dd2efdf962b93b"
                ],
                "parents" : [
                    "#"
                ],
                "data" : null,
                "state" : {

                },
                "a_attr" : {
                    "href" : "#"
                },
                "li_attr" : {
                    "id" : "2"
                },
                "icon" : true,
                "text" : "Páginas",
                "id" : "2"
            },
            {
                "parent" : "2",
                "children_d" : [
                    "8c6ef6d9de6027333d5493c2db9b5bed"
                ],
                "children" : [
                    "8c6ef6d9de6027333d5493c2db9b5bed"
                ],
                "parents" : [
                    "2",
                    "#"
                ],
                "data" : null,
                "state" : {

                },
                "a_attr" : {
                    "href" : "#"
                },
                "li_attr" : {
                    "id" : "e268cf7c411ca97601dd2efdf962b93b"
                },
                "icon" : true,
                "text" : "pag",
                "id" : "e268cf7c411ca97601dd2efdf962b93b"
            },
            {
                "parent" : "e268cf7c411ca97601dd2efdf962b93b",
                "children_d" : [

                ],
                "children" : [

                ],
                "parents" : [
                    "e268cf7c411ca97601dd2efdf962b93b",
                    "2",
                    "#"
                ],
                "data" : null,
                "state" : {

                },
                "a_attr" : {
                    "href" : "#"
                },
                "li_attr" : {
                    "id" : "8c6ef6d9de6027333d5493c2db9b5bed"
                },
                "icon" : true,
                "text" : "sub pag",
                "id" : "8c6ef6d9de6027333d5493c2db9b5bed"
            },
            {
                "parent" : "#",
                "children_d" : [
                    "0d0ac8af96f14045a73bcc46ff26705a",
                    "c37f688e3650e1777e3b7038306add74",
                    "9e18bf0fb9c3ad28e7f3785ad0c62694",
                    "e81224f80aad10dc6a562949014f7372",
                    "d250fd18c8bb326c46e426738a5796af",
                    "a89d9ada519da2aadf2ba9a548be714b",
                    "e640040670792df852548aa562790581",
                    "24700109ed92829bbbf825628c8bd817",
                    "cffd1cae59ec8e6bbc9d2a320f89edad",
                    "51da8d553707f20ff006dfc320cf15d3",
                    "4912cc42c761abb432cbbbcb83146af0",
                    "e93555c728aa1d0c2885bbf5face75d2",
                    "0ec62b694fef9b699fa90e38970a51f0",
                    "d3b58a2b82524598aaeed995f41dc6a7",
                    "3571c29663bc247d9a2ca8d80cd4d768",
                    "89bd1deb37603f3b2225254dd3072ecf",
                    "f4904b1447db562b383e6e4558b5062a",
                    "f0d7fb4076dab2aade5e9b892fecda92"
                ],
                "children" : [
                    "d3b58a2b82524598aaeed995f41dc6a7",
                    "3571c29663bc247d9a2ca8d80cd4d768",
                    "89bd1deb37603f3b2225254dd3072ecf",
                    "f4904b1447db562b383e6e4558b5062a",
                    "f0d7fb4076dab2aade5e9b892fecda92"
                ],
                "parents" : [
                    "#"
                ],
                "data" : null,
                "state" : {

                },
                "a_attr" : {
                    "href" : "#"
                },
                "li_attr" : {
                    "id" : "3"
                },
                "icon" : true,
                "text" : "Classificados",
                "id" : "3"
            },
            {
                "parent" : "3",
                "children_d" : [
                    "0d0ac8af96f14045a73bcc46ff26705a",
                    "c37f688e3650e1777e3b7038306add74",
                    "9e18bf0fb9c3ad28e7f3785ad0c62694",
                    "e81224f80aad10dc6a562949014f7372",
                    "d250fd18c8bb326c46e426738a5796af",
                    "a89d9ada519da2aadf2ba9a548be714b",
                    "e640040670792df852548aa562790581",
                    "24700109ed92829bbbf825628c8bd817"
                ],
                "children" : [
                    "24700109ed92829bbbf825628c8bd817"
                ],
                "parents" : [
                    "3",
                    "#"
                ],
                "data" : null,
                "state" : {

                },
                "a_attr" : {
                    "href" : "#"
                },
                "li_attr" : {
                    "id" : "d3b58a2b82524598aaeed995f41dc6a7"
                },
                "icon" : true,
                "text" : "Para a sua casa",
                "id" : "d3b58a2b82524598aaeed995f41dc6a7"
            },
            {
                "parent" : "d3b58a2b82524598aaeed995f41dc6a7",
                "children_d" : [
                    "0d0ac8af96f14045a73bcc46ff26705a",
                    "c37f688e3650e1777e3b7038306add74",
                    "9e18bf0fb9c3ad28e7f3785ad0c62694",
                    "e81224f80aad10dc6a562949014f7372",
                    "d250fd18c8bb326c46e426738a5796af",
                    "a89d9ada519da2aadf2ba9a548be714b",
                    "e640040670792df852548aa562790581"
                ],
                "children" : [
                    "0d0ac8af96f14045a73bcc46ff26705a",
                    "c37f688e3650e1777e3b7038306add74",
                    "9e18bf0fb9c3ad28e7f3785ad0c62694",
                    "e81224f80aad10dc6a562949014f7372",
                    "d250fd18c8bb326c46e426738a5796af",
                    "a89d9ada519da2aadf2ba9a548be714b",
                    "e640040670792df852548aa562790581"
                ],
                "parents" : [
                    "d3b58a2b82524598aaeed995f41dc6a7",
                    "3",
                    "#"
                ],
                "data" : null,
                "state" : {

                },
                "a_attr" : {
                    "href" : "#"
                },
                "li_attr" : {
                    "id" : "24700109ed92829bbbf825628c8bd817"
                },
                "icon" : true,
                "text" : "Móveis",
                "id" : "24700109ed92829bbbf825628c8bd817"
            },
            {
                "parent" : "24700109ed92829bbbf825628c8bd817",
                "children_d" : [

                ],
                "children" : [

                ],
                "parents" : [
                    "24700109ed92829bbbf825628c8bd817",
                    "d3b58a2b82524598aaeed995f41dc6a7",
                    "3",
                    "#"
                ],
                "data" : null,
                "state" : {

                },
                "a_attr" : {
                    "href" : "#"
                },
                "li_attr" : {
                    "id" : "0d0ac8af96f14045a73bcc46ff26705a"
                },
                "icon" : true,
                "text" : "Armários e guarda-roupas",
                "id" : "0d0ac8af96f14045a73bcc46ff26705a"
            },
            {
                "parent" : "24700109ed92829bbbf825628c8bd817",
                "children_d" : [

                ],
                "children" : [

                ],
                "parents" : [
                    "24700109ed92829bbbf825628c8bd817",
                    "d3b58a2b82524598aaeed995f41dc6a7",
                    "3",
                    "#"
                ],
                "data" : null,
                "state" : {

                },
                "a_attr" : {
                    "href" : "#"
                },
                "li_attr" : {
                    "id" : "c37f688e3650e1777e3b7038306add74"
                },
                "icon" : true,
                "text" : "Camas e colchões",
                "id" : "c37f688e3650e1777e3b7038306add74"
            },
            {
                "parent" : "24700109ed92829bbbf825628c8bd817",
                "children_d" : [

                ],
                "children" : [

                ],
                "parents" : [
                    "24700109ed92829bbbf825628c8bd817",
                    "d3b58a2b82524598aaeed995f41dc6a7",
                    "3",
                    "#"
                ],
                "data" : null,
                "state" : {

                },
                "a_attr" : {
                    "href" : "#"
                },
                "li_attr" : {
                    "id" : "9e18bf0fb9c3ad28e7f3785ad0c62694"
                },
                "icon" : true,
                "text" : "Estantes",
                "id" : "9e18bf0fb9c3ad28e7f3785ad0c62694"
            },
            {
                "parent" : "24700109ed92829bbbf825628c8bd817",
                "children_d" : [

                ],
                "children" : [

                ],
                "parents" : [
                    "24700109ed92829bbbf825628c8bd817",
                    "d3b58a2b82524598aaeed995f41dc6a7",
                    "3",
                    "#"
                ],
                "data" : null,
                "state" : {

                },
                "a_attr" : {
                    "href" : "#"
                },
                "li_attr" : {
                    "id" : "e81224f80aad10dc6a562949014f7372"
                },
                "icon" : true,
                "text" : "Mesas e cadeiras",
                "id" : "e81224f80aad10dc6a562949014f7372"
            },
            {
                "parent" : "24700109ed92829bbbf825628c8bd817",
                "children_d" : [

                ],
                "children" : [

                ],
                "parents" : [
                    "24700109ed92829bbbf825628c8bd817",
                    "d3b58a2b82524598aaeed995f41dc6a7",
                    "3",
                    "#"
                ],
                "data" : null,
                "state" : {

                },
                "a_attr" : {
                    "href" : "#"
                },
                "li_attr" : {
                    "id" : "d250fd18c8bb326c46e426738a5796af"
                },
                "icon" : true,
                "text" : "Sofás e poltronas",
                "id" : "d250fd18c8bb326c46e426738a5796af"
            },
            {
                "parent" : "24700109ed92829bbbf825628c8bd817",
                "children_d" : [

                ],
                "children" : [

                ],
                "parents" : [
                    "24700109ed92829bbbf825628c8bd817",
                    "d3b58a2b82524598aaeed995f41dc6a7",
                    "3",
                    "#"
                ],
                "data" : null,
                "state" : {

                },
                "a_attr" : {
                    "href" : "#"
                },
                "li_attr" : {
                    "id" : "a89d9ada519da2aadf2ba9a548be714b"
                },
                "icon" : true,
                "text" : "Racks",
                "id" : "a89d9ada519da2aadf2ba9a548be714b"
            },
            {
                "parent" : "24700109ed92829bbbf825628c8bd817",
                "children_d" : [

                ],
                "children" : [

                ],
                "parents" : [
                    "24700109ed92829bbbf825628c8bd817",
                    "d3b58a2b82524598aaeed995f41dc6a7",
                    "3",
                    "#"
                ],
                "data" : null,
                "state" : {

                },
                "a_attr" : {
                    "href" : "#"
                },
                "li_attr" : {
                    "id" : "e640040670792df852548aa562790581"
                },
                "icon" : true,
                "text" : "Outros",
                "id" : "e640040670792df852548aa562790581"
            },
            {
                "parent" : "3",
                "children_d" : [
                    "cffd1cae59ec8e6bbc9d2a320f89edad",
                    "51da8d553707f20ff006dfc320cf15d3",
                    "4912cc42c761abb432cbbbcb83146af0"
                ],
                "children" : [
                    "cffd1cae59ec8e6bbc9d2a320f89edad",
                    "51da8d553707f20ff006dfc320cf15d3",
                    "4912cc42c761abb432cbbbcb83146af0"
                ],
                "parents" : [
                    "3",
                    "#"
                ],
                "data" : null,
                "state" : {

                },
                "a_attr" : {
                    "href" : "#"
                },
                "li_attr" : {
                    "id" : "3571c29663bc247d9a2ca8d80cd4d768"
                },
                "icon" : true,
                "text" : "Eletrônicos e celulares",
                "id" : "3571c29663bc247d9a2ca8d80cd4d768"
            },
            {
                "parent" : "3571c29663bc247d9a2ca8d80cd4d768",
                "children_d" : [

                ],
                "children" : [

                ],
                "parents" : [
                    "3571c29663bc247d9a2ca8d80cd4d768",
                    "3",
                    "#"
                ],
                "data" : {
                    "approval" : true
                },
                "state" : {

                },
                "a_attr" : {
                    "href" : "#"
                },
                "li_attr" : {
                    "id" : "cffd1cae59ec8e6bbc9d2a320f89edad"
                },
                "icon" : true,
                "text" : "Escritório* Editado.",
                "id" : "cffd1cae59ec8e6bbc9d2a320f89edad"
            },
            {
                "parent" : "3571c29663bc247d9a2ca8d80cd4d768",
                "children_d" : [

                ],
                "children" : [

                ],
                "parents" : [
                    "3571c29663bc247d9a2ca8d80cd4d768",
                    "3",
                    "#"
                ],
                "data" : {
                    "fields" : [
                        {
                            "required" : true,
                            "name" : "newOrUsed"
                        }
                    ]
                },
                "state" : {

                },
                "a_attr" : {
                    "href" : "#"
                },
                "li_attr" : {
                    "id" : "51da8d553707f20ff006dfc320cf15d3"
                },
                "icon" : true,
                "text" : "iPhone Apple",
                "id" : "51da8d553707f20ff006dfc320cf15d3"
            },
            {
                "parent" : "3571c29663bc247d9a2ca8d80cd4d768",
                "children_d" : [

                ],
                "children" : [

                ],
                "parents" : [
                    "3571c29663bc247d9a2ca8d80cd4d768",
                    "3",
                    "#"
                ],
                "data" : {
                    "fields" : [
                        "newOrUsed"
                    ]
                },
                "state" : {

                },
                "a_attr" : {
                    "href" : "#"
                },
                "li_attr" : {
                    "id" : "4912cc42c761abb432cbbbcb83146af0"
                },
                "icon" : true,
                "text" : "Samsung",
                "id" : "4912cc42c761abb432cbbbcb83146af0"
            },
            {
                "parent" : "3",
                "children_d" : [
                    "e93555c728aa1d0c2885bbf5face75d2"
                ],
                "children" : [
                    "e93555c728aa1d0c2885bbf5face75d2"
                ],
                "parents" : [
                    "3",
                    "#"
                ],
                "data" : null,
                "state" : {

                },
                "a_attr" : {
                    "href" : "#"
                },
                "li_attr" : {
                    "id" : "89bd1deb37603f3b2225254dd3072ecf"
                },
                "icon" : true,
                "text" : "Categoria 1DT Editada",
                "id" : "89bd1deb37603f3b2225254dd3072ecf"
            },
            {
                "parent" : "89bd1deb37603f3b2225254dd3072ecf",
                "children_d" : [

                ],
                "children" : [

                ],
                "parents" : [
                    "89bd1deb37603f3b2225254dd3072ecf",
                    "3",
                    "#"
                ],
                "data" : null,
                "state" : {

                },
                "a_attr" : {
                    "href" : "#"
                },
                "li_attr" : {
                    "id" : "e93555c728aa1d0c2885bbf5face75d2"
                },
                "icon" : true,
                "text" : "SubCategoria 2 1DT - Nivel 1",
                "id" : "e93555c728aa1d0c2885bbf5face75d2"
            },
            {
                "parent" : "3",
                "children_d" : [

                ],
                "children" : [

                ],
                "parents" : [
                    "3",
                    "#"
                ],
                "data" : {
                    "approval" : true
                },
                "state" : {

                },
                "a_attr" : {
                    "href" : "#"
                },
                "li_attr" : {
                    "id" : "f4904b1447db562b383e6e4558b5062a"
                },
                "icon" : true,
                "text" : "Categoria 1DT - Com aprovação",
                "id" : "f4904b1447db562b383e6e4558b5062a"
            },
            {
                "parent" : "3",
                "children_d" : [
                    "0ec62b694fef9b699fa90e38970a51f0"
                ],
                "children" : [
                    "0ec62b694fef9b699fa90e38970a51f0"
                ],
                "parents" : [
                    "3",
                    "#"
                ],
                "data" : {
                    "approval" : true
                },
                "state" : {

                },
                "a_attr" : {
                    "href" : "#"
                },
                "li_attr" : {
                    "id" : "f0d7fb4076dab2aade5e9b892fecda92"
                },
                "icon" : true,
                "text" : "Categoria 1DT - Com aprovação 2",
                "id" : "f0d7fb4076dab2aade5e9b892fecda92"
            },
            {
                "parent" : "f0d7fb4076dab2aade5e9b892fecda92",
                "children_d" : [

                ],
                "children" : [

                ],
                "parents" : [
                    "f0d7fb4076dab2aade5e9b892fecda92",
                    "3",
                    "#"
                ],
                "data" : null,
                "state" : {

                },
                "a_attr" : {
                    "href" : "#"
                },
                "li_attr" : {
                    "id" : "0ec62b694fef9b699fa90e38970a51f0"
                },
                "icon" : true,
                "text" : "Subcategoria 1DT - Com aprovação 2 - Nível 1",
                "id" : "0ec62b694fef9b699fa90e38970a51f0"
            },
            {
                "parent" : "#",
                "children_d" : [
                    "7b61ac2537d7f7be77006628f5ed95f0",
                    "ec6c2b7b91e55a5c23ab2e5676c4acf7",
                    "56331a638041e93075e859d784d296f3",
                    "a9b585362fe4109e651117e09e0ec495",
                    "f1aba098d3ccf5d66038ebb20cf489b0",
                    "b4b68d92f273c65ca63bc5ecc123c57d",
                    "19b3c9c955bf4733d6542bff787f22e9",
                    "b1f601234c8aa10b3c9cf83af3f6f164",
                    "bec6aee7ebe23e36d7b93a6d7b90f1b0",
                    "9b07ec1fe8276c6896ff74c3f8aaf05c",
                    "5d7c787e4fc800956231b6a40b16165a",
                    "d26926bd8d198166a4a5007f1dde8987",
                    "85b93632ff0023074c878be4e9e22b86",
                    "2973a0a2f2ba5332a9f0e7793a225e25",
                    "738c31b42e78a55d0078545b30c4ead5",
                    "820ffccb4937599d1d445d2063a96cb3",
                    "a6a1424f09550923149f7d8c98bbf206",
                    "4b569630500fe3d831baf95f7ecf1242",
                    "f7aa648b19581260f8ce7c5af0eda014",
                    "32eb9205694d78a51ef12c2ad1826251",
                    "7c0e561c05a6f2c6cb22ba8ed3736d80",
                    "948b96cebb06c2a1f1ff523e7793b8b8",
                    "50c61e3434b4d58683df763c3282c26b",
                    "282852d8b3dc8752c2b7d9dcfa1988ad",
                    "9e8c84a12ecc0825aac6875179c96f98",
                    "94262c8f68340a9ac6d73d4c555ce665",
                    "43ed83b224b4ac26b30f7d714c1cb40d",
                    "6c48642543b0512d41f56b9bb0bf49ac",
                    "0e02aa7f006ce550687d52cc7867fd09",
                    "2b5211c3ffb562a89a89f802475fe90d"
                ],
                "children" : [
                    "6c48642543b0512d41f56b9bb0bf49ac",
                    "0e02aa7f006ce550687d52cc7867fd09",
                    "2b5211c3ffb562a89a89f802475fe90d"
                ],
                "parents" : [
                    "#"
                ],
                "data" : null,
                "state" : {

                },
                "a_attr" : {
                    "href" : "#"
                },
                "li_attr" : {
                    "id" : "4"
                },
                "icon" : true,
                "text" : "Imóveis",
                "id" : "4"
            },
            {
                "parent" : "4",
                "children_d" : [
                    "7b61ac2537d7f7be77006628f5ed95f0",
                    "ec6c2b7b91e55a5c23ab2e5676c4acf7",
                    "56331a638041e93075e859d784d296f3",
                    "a9b585362fe4109e651117e09e0ec495",
                    "f1aba098d3ccf5d66038ebb20cf489b0",
                    "b4b68d92f273c65ca63bc5ecc123c57d",
                    "19b3c9c955bf4733d6542bff787f22e9",
                    "b1f601234c8aa10b3c9cf83af3f6f164",
                    "bec6aee7ebe23e36d7b93a6d7b90f1b0",
                    "9b07ec1fe8276c6896ff74c3f8aaf05c",
                    "5d7c787e4fc800956231b6a40b16165a"
                ],
                "children" : [
                    "7b61ac2537d7f7be77006628f5ed95f0",
                    "ec6c2b7b91e55a5c23ab2e5676c4acf7",
                    "56331a638041e93075e859d784d296f3",
                    "a9b585362fe4109e651117e09e0ec495",
                    "f1aba098d3ccf5d66038ebb20cf489b0",
                    "b4b68d92f273c65ca63bc5ecc123c57d",
                    "19b3c9c955bf4733d6542bff787f22e9",
                    "b1f601234c8aa10b3c9cf83af3f6f164",
                    "bec6aee7ebe23e36d7b93a6d7b90f1b0",
                    "9b07ec1fe8276c6896ff74c3f8aaf05c",
                    "5d7c787e4fc800956231b6a40b16165a"
                ],
                "parents" : [
                    "4",
                    "#"
                ],
                "data" : {
                    "types" : [
                        1,
                        2,
                        3,
                        4
                    ]
                },
                "state" : {

                },
                "a_attr" : {
                    "href" : "#"
                },
                "li_attr" : {
                    "id" : "6c48642543b0512d41f56b9bb0bf49ac"
                },
                "icon" : true,
                "text" : "Residencial",
                "id" : "6c48642543b0512d41f56b9bb0bf49ac"
            },
            {
                "parent" : "6c48642543b0512d41f56b9bb0bf49ac",
                "children_d" : [

                ],
                "children" : [

                ],
                "parents" : [
                    "6c48642543b0512d41f56b9bb0bf49ac",
                    "4",
                    "#"
                ],
                "data" : {
                    "search" : {
                        "season" : [
                            {
                                "show" : 1,
                                "id" : "rooms"
                            },
                            {
                                "show" : 1,
                                "id" : "price"
                            },
                            {
                                "show" : 1,
                                "id" : "suites"
                            },
                            {
                                "show" : 1,
                                "id" : "areas"
                            },
                            {
                                "show" : 1,
                                "id" : "garages"
                            }
                        ],
                        "general" : [
                            {
                                "show" : 1,
                                "id" : "price"
                            },
                            {
                                "show" : 1,
                                "id" : "area"
                            },
                            {
                                "show" : 1,
                                "id" : "room"
                            },
                            {
                                "show" : 1,
                                "id" : "suites"
                            },
                            {
                                "show" : 1,
                                "id" : "garages"
                            }
                        ]
                    },
                    "types" : [
                        1,
                        2,
                        3,
                        4
                    ]
                },
                "state" : {

                },
                "a_attr" : {
                    "href" : "#"
                },
                "li_attr" : {
                    "id" : "7b61ac2537d7f7be77006628f5ed95f0"
                },
                "icon" : true,
                "text" : "Apartamento Padrão",
                "id" : "7b61ac2537d7f7be77006628f5ed95f0"
            },
            {
                "parent" : "6c48642543b0512d41f56b9bb0bf49ac",
                "children_d" : [

                ],
                "children" : [

                ],
                "parents" : [
                    "6c48642543b0512d41f56b9bb0bf49ac",
                    "4",
                    "#"
                ],
                "data" : {
                    "search" : {
                        "season" : [
                            {
                                "show" : 1,
                                "id" : "rooms"
                            },
                            {
                                "show" : 1,
                                "id" : "price"
                            },
                            {
                                "show" : 1,
                                "id" : "suites"
                            },
                            {
                                "show" : 1,
                                "id" : "areas"
                            },
                            {
                                "show" : 1,
                                "id" : "garages"
                            }
                        ],
                        "general" : [
                            {
                                "show" : 1,
                                "id" : "price"
                            },
                            {
                                "show" : 1,
                                "id" : "area"
                            },
                            {
                                "show" : 1,
                                "id" : "room"
                            },
                            {
                                "show" : 1,
                                "id" : "suites"
                            },
                            {
                                "show" : 1,
                                "id" : "garages"
                            }
                        ]
                    },
                    "types" : [
                        1,
                        2,
                        3,
                        4
                    ]
                },
                "state" : {

                },
                "a_attr" : {
                    "href" : "#"
                },
                "li_attr" : {
                    "id" : "ec6c2b7b91e55a5c23ab2e5676c4acf7"
                },
                "icon" : true,
                "text" : "Casa de Condomínio",
                "id" : "ec6c2b7b91e55a5c23ab2e5676c4acf7"
            },
            {
                "parent" : "6c48642543b0512d41f56b9bb0bf49ac",
                "children_d" : [

                ],
                "children" : [

                ],
                "parents" : [
                    "6c48642543b0512d41f56b9bb0bf49ac",
                    "4",
                    "#"
                ],
                "data" : {
                    "search" : {
                        "season" : [
                            {
                                "show" : 1,
                                "id" : "rooms"
                            },
                            {
                                "show" : 1,
                                "id" : "price"
                            },
                            {
                                "show" : 1,
                                "id" : "suites"
                            },
                            {
                                "show" : 1,
                                "id" : "areas"
                            },
                            {
                                "show" : 1,
                                "id" : "garages"
                            }
                        ],
                        "general" : [
                            {
                                "show" : 1,
                                "id" : "price"
                            },
                            {
                                "show" : 1,
                                "id" : "area"
                            },
                            {
                                "show" : 1,
                                "id" : "room"
                            },
                            {
                                "show" : 1,
                                "id" : "suites"
                            },
                            {
                                "show" : 1,
                                "id" : "garages"
                            }
                        ]
                    },
                    "types" : [
                        1,
                        2,
                        4
                    ]
                },
                "state" : {

                },
                "a_attr" : {
                    "href" : "#"
                },
                "li_attr" : {
                    "id" : "56331a638041e93075e859d784d296f3"
                },
                "icon" : true,
                "text" : "Casa de Vila",
                "id" : "56331a638041e93075e859d784d296f3"
            },
            {
                "parent" : "6c48642543b0512d41f56b9bb0bf49ac",
                "children_d" : [

                ],
                "children" : [

                ],
                "parents" : [
                    "6c48642543b0512d41f56b9bb0bf49ac",
                    "4",
                    "#"
                ],
                "data" : {
                    "search" : {
                        "season" : [
                            {
                                "show" : 1,
                                "id" : "rooms"
                            },
                            {
                                "show" : 1,
                                "id" : "price"
                            },
                            {
                                "show" : 1,
                                "id" : "suites"
                            },
                            {
                                "show" : 1,
                                "id" : "areas"
                            },
                            {
                                "show" : 1,
                                "id" : "garages"
                            }
                        ],
                        "general" : [
                            {
                                "show" : 1,
                                "id" : "price"
                            },
                            {
                                "show" : 1,
                                "id" : "area"
                            },
                            {
                                "show" : 1,
                                "id" : "room"
                            },
                            {
                                "show" : 1,
                                "id" : "suites"
                            },
                            {
                                "show" : 1,
                                "id" : "garages"
                            }
                        ]
                    },
                    "types" : [
                        1,
                        2,
                        3,
                        4
                    ]
                },
                "state" : {

                },
                "a_attr" : {
                    "href" : "#"
                },
                "li_attr" : {
                    "id" : "a9b585362fe4109e651117e09e0ec495"
                },
                "icon" : true,
                "text" : "Casa Padrão",
                "id" : "a9b585362fe4109e651117e09e0ec495"
            },
            {
                "parent" : "6c48642543b0512d41f56b9bb0bf49ac",
                "children_d" : [

                ],
                "children" : [

                ],
                "parents" : [
                    "6c48642543b0512d41f56b9bb0bf49ac",
                    "4",
                    "#"
                ],
                "data" : {
                    "search" : {
                        "season" : [
                            {
                                "show" : 1,
                                "id" : "rooms"
                            },
                            {
                                "show" : 1,
                                "id" : "price"
                            },
                            {
                                "show" : 1,
                                "id" : "suites"
                            },
                            {
                                "show" : 1,
                                "id" : "areas"
                            },
                            {
                                "show" : 1,
                                "id" : "garages"
                            }
                        ],
                        "general" : [
                            {
                                "show" : 1,
                                "id" : "price"
                            },
                            {
                                "show" : 1,
                                "id" : "area"
                            },
                            {
                                "show" : 1,
                                "id" : "room"
                            },
                            {
                                "show" : 1,
                                "id" : "suites"
                            },
                            {
                                "show" : 1,
                                "id" : "garages"
                            }
                        ]
                    },
                    "types" : [
                        1,
                        2,
                        3,
                        4
                    ]
                },
                "state" : {

                },
                "a_attr" : {
                    "href" : "#"
                },
                "li_attr" : {
                    "id" : "f1aba098d3ccf5d66038ebb20cf489b0"
                },
                "icon" : true,
                "text" : "Cobertura",
                "id" : "f1aba098d3ccf5d66038ebb20cf489b0"
            },
            {
                "parent" : "6c48642543b0512d41f56b9bb0bf49ac",
                "children_d" : [

                ],
                "children" : [

                ],
                "parents" : [
                    "6c48642543b0512d41f56b9bb0bf49ac",
                    "4",
                    "#"
                ],
                "data" : {
                    "search" : {
                        "season" : [
                            {
                                "show" : 1,
                                "id" : "rooms"
                            },
                            {
                                "show" : 1,
                                "id" : "price"
                            },
                            {
                                "show" : 1,
                                "id" : "suites"
                            },
                            {
                                "show" : 1,
                                "id" : "areas"
                            },
                            {
                                "show" : 1,
                                "id" : "garages"
                            }
                        ],
                        "general" : [
                            {
                                "show" : 1,
                                "id" : "price"
                            },
                            {
                                "show" : 1,
                                "id" : "area"
                            },
                            {
                                "show" : 1,
                                "id" : "room"
                            },
                            {
                                "show" : 1,
                                "id" : "suites"
                            },
                            {
                                "show" : 1,
                                "id" : "garages"
                            }
                        ]
                    },
                    "types" : [
                        1,
                        2,
                        3,
                        4
                    ]
                },
                "state" : {

                },
                "a_attr" : {
                    "href" : "#"
                },
                "li_attr" : {
                    "id" : "b4b68d92f273c65ca63bc5ecc123c57d"
                },
                "icon" : true,
                "text" : "Flat",
                "id" : "b4b68d92f273c65ca63bc5ecc123c57d"
            },
            {
                "parent" : "6c48642543b0512d41f56b9bb0bf49ac",
                "children_d" : [

                ],
                "children" : [

                ],
                "parents" : [
                    "6c48642543b0512d41f56b9bb0bf49ac",
                    "4",
                    "#"
                ],
                "data" : {
                    "search" : {
                        "season" : [
                            {
                                "show" : 1,
                                "id" : "rooms"
                            },
                            {
                                "show" : 1,
                                "id" : "price"
                            },
                            {
                                "show" : 1,
                                "id" : "suites"
                            },
                            {
                                "show" : 1,
                                "id" : "areas"
                            },
                            {
                                "show" : 1,
                                "id" : "garages"
                            }
                        ],
                        "general" : [
                            {
                                "show" : 1,
                                "id" : "price"
                            },
                            {
                                "show" : 1,
                                "id" : "area"
                            },
                            {
                                "show" : 1,
                                "id" : "room"
                            },
                            {
                                "show" : 1,
                                "id" : "suites"
                            },
                            {
                                "show" : 1,
                                "id" : "garages"
                            }
                        ]
                    },
                    "types" : [
                        1,
                        2,
                        4
                    ]
                },
                "state" : {

                },
                "a_attr" : {
                    "href" : "#"
                },
                "li_attr" : {
                    "id" : "19b3c9c955bf4733d6542bff787f22e9"
                },
                "icon" : true,
                "text" : "Kitchenette-Conjugados",
                "id" : "19b3c9c955bf4733d6542bff787f22e9"
            },
            {
                "parent" : "6c48642543b0512d41f56b9bb0bf49ac",
                "children_d" : [

                ],
                "children" : [

                ],
                "parents" : [
                    "6c48642543b0512d41f56b9bb0bf49ac",
                    "4",
                    "#"
                ],
                "data" : {
                    "search" : {
                        "season" : [
                            {
                                "show" : 1,
                                "id" : "rooms"
                            },
                            {
                                "show" : 1,
                                "id" : "price"
                            },
                            {
                                "show" : 1,
                                "id" : "suites"
                            },
                            {
                                "show" : 1,
                                "id" : "areas"
                            },
                            {
                                "show" : 1,
                                "id" : "garages"
                            }
                        ],
                        "general" : [
                            {
                                "show" : 1,
                                "id" : "price"
                            },
                            {
                                "show" : 1,
                                "id" : "area"
                            },
                            {
                                "show" : 1,
                                "id" : "room"
                            },
                            {
                                "show" : 1,
                                "id" : "suites"
                            },
                            {
                                "show" : 1,
                                "id" : "garages"
                            }
                        ]
                    },
                    "types" : [
                        1,
                        2,
                        3,
                        4
                    ]
                },
                "state" : {

                },
                "a_attr" : {
                    "href" : "#"
                },
                "li_attr" : {
                    "id" : "b1f601234c8aa10b3c9cf83af3f6f164"
                },
                "icon" : true,
                "text" : "Loft",
                "id" : "b1f601234c8aa10b3c9cf83af3f6f164"
            },
            {
                "parent" : "6c48642543b0512d41f56b9bb0bf49ac",
                "children_d" : [

                ],
                "children" : [

                ],
                "parents" : [
                    "6c48642543b0512d41f56b9bb0bf49ac",
                    "4",
                    "#"
                ],
                "data" : {
                    "search" : {
                        "season" : [
                            {
                                "show" : 1,
                                "id" : "rooms"
                            },
                            {
                                "show" : 1,
                                "id" : "price"
                            },
                            {
                                "show" : 1,
                                "id" : "suites"
                            },
                            {
                                "show" : 1,
                                "id" : "areas"
                            },
                            {
                                "show" : 1,
                                "id" : "garages"
                            }
                        ],
                        "general" : [
                            {
                                "show" : 1,
                                "id" : "price"
                            },
                            {
                                "show" : 1,
                                "id" : "area"
                            },
                            {
                                "show" : 0,
                                "id" : "room"
                            },
                            {
                                "show" : 0,
                                "id" : "suites"
                            },
                            {
                                "show" : 1,
                                "id" : "garages"
                            }
                        ]
                    },
                    "types" : [
                        1,
                        2
                    ]
                },
                "state" : {

                },
                "a_attr" : {
                    "href" : "#"
                },
                "li_attr" : {
                    "id" : "bec6aee7ebe23e36d7b93a6d7b90f1b0"
                },
                "icon" : true,
                "text" : "Loteamento-Condomínio",
                "id" : "bec6aee7ebe23e36d7b93a6d7b90f1b0"
            },
            {
                "parent" : "6c48642543b0512d41f56b9bb0bf49ac",
                "children_d" : [

                ],
                "children" : [

                ],
                "parents" : [
                    "6c48642543b0512d41f56b9bb0bf49ac",
                    "4",
                    "#"
                ],
                "data" : {
                    "search" : {
                        "season" : [
                            {
                                "show" : 1,
                                "id" : "rooms"
                            },
                            {
                                "show" : 1,
                                "id" : "price"
                            },
                            {
                                "show" : 1,
                                "id" : "suites"
                            },
                            {
                                "show" : 1,
                                "id" : "areas"
                            },
                            {
                                "show" : 1,
                                "id" : "garages"
                            }
                        ],
                        "general" : [
                            {
                                "show" : 1,
                                "id" : "price"
                            },
                            {
                                "show" : 1,
                                "id" : "area"
                            },
                            {
                                "show" : 1,
                                "id" : "room"
                            },
                            {
                                "show" : 1,
                                "id" : "suites"
                            },
                            {
                                "show" : 1,
                                "id" : "garages"
                            }
                        ]
                    },
                    "types" : [
                        2
                    ]
                },
                "state" : {

                },
                "a_attr" : {
                    "href" : "#"
                },
                "li_attr" : {
                    "id" : "9b07ec1fe8276c6896ff74c3f8aaf05c"
                },
                "icon" : true,
                "text" : "Studio",
                "id" : "9b07ec1fe8276c6896ff74c3f8aaf05c"
            },
            {
                "parent" : "6c48642543b0512d41f56b9bb0bf49ac",
                "children_d" : [

                ],
                "children" : [

                ],
                "parents" : [
                    "6c48642543b0512d41f56b9bb0bf49ac",
                    "4",
                    "#"
                ],
                "data" : {
                    "search" : {
                        "season" : [
                            {
                                "show" : 0,
                                "id" : "rooms"
                            },
                            {
                                "show" : 1,
                                "id" : "price"
                            },
                            {
                                "show" : 0,
                                "id" : "suites"
                            },
                            {
                                "show" : 1,
                                "id" : "areas"
                            },
                            {
                                "show" : 1,
                                "id" : "garages"
                            }
                        ],
                        "general" : [
                            {
                                "show" : 1,
                                "id" : "price"
                            },
                            {
                                "show" : 1,
                                "id" : "area"
                            },
                            {
                                "show" : 0,
                                "id" : "room"
                            },
                            {
                                "show" : 0,
                                "id" : "suites"
                            },
                            {
                                "show" : 1,
                                "id" : "garages"
                            }
                        ]
                    },
                    "types" : [
                        1,
                        2,
                        4
                    ]
                },
                "state" : {

                },
                "a_attr" : {
                    "href" : "#"
                },
                "li_attr" : {
                    "id" : "5d7c787e4fc800956231b6a40b16165a"
                },
                "icon" : true,
                "text" : "Terreno Padrão",
                "id" : "5d7c787e4fc800956231b6a40b16165a"
            },
            {
                "parent" : "4",
                "children_d" : [
                    "d26926bd8d198166a4a5007f1dde8987",
                    "85b93632ff0023074c878be4e9e22b86",
                    "2973a0a2f2ba5332a9f0e7793a225e25",
                    "738c31b42e78a55d0078545b30c4ead5",
                    "820ffccb4937599d1d445d2063a96cb3",
                    "a6a1424f09550923149f7d8c98bbf206",
                    "4b569630500fe3d831baf95f7ecf1242",
                    "f7aa648b19581260f8ce7c5af0eda014",
                    "32eb9205694d78a51ef12c2ad1826251",
                    "7c0e561c05a6f2c6cb22ba8ed3736d80",
                    "948b96cebb06c2a1f1ff523e7793b8b8",
                    "50c61e3434b4d58683df763c3282c26b"
                ],
                "children" : [
                    "d26926bd8d198166a4a5007f1dde8987",
                    "85b93632ff0023074c878be4e9e22b86",
                    "2973a0a2f2ba5332a9f0e7793a225e25",
                    "738c31b42e78a55d0078545b30c4ead5",
                    "820ffccb4937599d1d445d2063a96cb3",
                    "a6a1424f09550923149f7d8c98bbf206",
                    "4b569630500fe3d831baf95f7ecf1242",
                    "f7aa648b19581260f8ce7c5af0eda014",
                    "32eb9205694d78a51ef12c2ad1826251",
                    "7c0e561c05a6f2c6cb22ba8ed3736d80",
                    "948b96cebb06c2a1f1ff523e7793b8b8",
                    "50c61e3434b4d58683df763c3282c26b"
                ],
                "parents" : [
                    "4",
                    "#"
                ],
                "data" : {
                    "types" : [
                        1,
                        2,
                        3,
                        4
                    ]
                },
                "state" : {

                },
                "a_attr" : {
                    "href" : "#"
                },
                "li_attr" : {
                    "id" : "0e02aa7f006ce550687d52cc7867fd09"
                },
                "icon" : true,
                "text" : "Comercial",
                "id" : "0e02aa7f006ce550687d52cc7867fd09"
            },
            {
                "parent" : "0e02aa7f006ce550687d52cc7867fd09",
                "children_d" : [

                ],
                "children" : [

                ],
                "parents" : [
                    "0e02aa7f006ce550687d52cc7867fd09",
                    "4",
                    "#"
                ],
                "data" : {
                    "search" : {
                        "season" : [
                            {
                                "show" : 0,
                                "id" : "rooms"
                            },
                            {
                                "show" : 1,
                                "id" : "price"
                            },
                            {
                                "show" : 0,
                                "id" : "suites"
                            },
                            {
                                "show" : 1,
                                "id" : "areas"
                            },
                            {
                                "show" : 1,
                                "id" : "garages"
                            }
                        ],
                        "general" : [
                            {
                                "show" : 1,
                                "id" : "price"
                            },
                            {
                                "show" : 1,
                                "id" : "area"
                            },
                            {
                                "show" : 0,
                                "id" : "room"
                            },
                            {
                                "show" : 0,
                                "id" : "suites"
                            },
                            {
                                "show" : 1,
                                "id" : "garages"
                            }
                        ]
                    },
                    "types" : [
                        1,
                        2,
                        4
                    ]
                },
                "state" : {

                },
                "a_attr" : {
                    "href" : "#"
                },
                "li_attr" : {
                    "id" : "d26926bd8d198166a4a5007f1dde8987"
                },
                "icon" : true,
                "text" : "Box-Garagem",
                "id" : "d26926bd8d198166a4a5007f1dde8987"
            },
            {
                "parent" : "0e02aa7f006ce550687d52cc7867fd09",
                "children_d" : [

                ],
                "children" : [

                ],
                "parents" : [
                    "0e02aa7f006ce550687d52cc7867fd09",
                    "4",
                    "#"
                ],
                "data" : {
                    "search" : {
                        "season" : [
                            {
                                "show" : 1,
                                "id" : "rooms"
                            },
                            {
                                "show" : 1,
                                "id" : "price"
                            },
                            {
                                "show" : 1,
                                "id" : "suites"
                            },
                            {
                                "show" : 1,
                                "id" : "areas"
                            },
                            {
                                "show" : 1,
                                "id" : "garages"
                            }
                        ],
                        "general" : [
                            {
                                "show" : 1,
                                "id" : "price"
                            },
                            {
                                "show" : 1,
                                "id" : "area"
                            },
                            {
                                "show" : 1,
                                "id" : "room"
                            },
                            {
                                "show" : 1,
                                "id" : "suites"
                            },
                            {
                                "show" : 1,
                                "id" : "garages"
                            }
                        ]
                    },
                    "types" : [
                        1,
                        2,
                        4
                    ]
                },
                "state" : {

                },
                "a_attr" : {
                    "href" : "#"
                },
                "li_attr" : {
                    "id" : "85b93632ff0023074c878be4e9e22b86"
                },
                "icon" : true,
                "text" : "Casa Comercial",
                "id" : "85b93632ff0023074c878be4e9e22b86"
            },
            {
                "parent" : "0e02aa7f006ce550687d52cc7867fd09",
                "children_d" : [

                ],
                "children" : [

                ],
                "parents" : [
                    "0e02aa7f006ce550687d52cc7867fd09",
                    "4",
                    "#"
                ],
                "data" : {
                    "search" : {
                        "season" : [
                            {
                                "show" : 1,
                                "id" : "rooms"
                            },
                            {
                                "show" : 1,
                                "id" : "price"
                            },
                            {
                                "show" : 0,
                                "id" : "suites"
                            },
                            {
                                "show" : 1,
                                "id" : "areas"
                            },
                            {
                                "show" : 1,
                                "id" : "garages"
                            }
                        ],
                        "general" : [
                            {
                                "show" : 1,
                                "id" : "price"
                            },
                            {
                                "show" : 1,
                                "id" : "area"
                            },
                            {
                                "show" : 1,
                                "id" : "room"
                            },
                            {
                                "show" : 0,
                                "id" : "suites"
                            },
                            {
                                "show" : 1,
                                "id" : "garages"
                            }
                        ]
                    },
                    "types" : [
                        1,
                        2,
                        3,
                        4
                    ]
                },
                "state" : {

                },
                "a_attr" : {
                    "href" : "#"
                },
                "li_attr" : {
                    "id" : "2973a0a2f2ba5332a9f0e7793a225e25"
                },
                "icon" : true,
                "text" : "Conjunto Comercial-Sala",
                "id" : "2973a0a2f2ba5332a9f0e7793a225e25"
            },
            {
                "parent" : "0e02aa7f006ce550687d52cc7867fd09",
                "children_d" : [

                ],
                "children" : [

                ],
                "parents" : [
                    "0e02aa7f006ce550687d52cc7867fd09",
                    "4",
                    "#"
                ],
                "data" : {
                    "search" : {
                        "season" : [
                            {
                                "show" : 1,
                                "id" : "rooms"
                            },
                            {
                                "show" : 1,
                                "id" : "price"
                            },
                            {
                                "show" : 0,
                                "id" : "suites"
                            },
                            {
                                "show" : 1,
                                "id" : "areas"
                            },
                            {
                                "show" : 1,
                                "id" : "garages"
                            }
                        ],
                        "general" : [
                            {
                                "show" : 1,
                                "id" : "price"
                            },
                            {
                                "show" : 1,
                                "id" : "area"
                            },
                            {
                                "show" : 1,
                                "id" : "room"
                            },
                            {
                                "show" : 0,
                                "id" : "suites"
                            },
                            {
                                "show" : 1,
                                "id" : "garages"
                            }
                        ]
                    },
                    "types" : [
                        1,
                        2
                    ]
                },
                "state" : {

                },
                "a_attr" : {
                    "href" : "#"
                },
                "li_attr" : {
                    "id" : "738c31b42e78a55d0078545b30c4ead5"
                },
                "icon" : true,
                "text" : "Galpão-Depósito-Armazém",
                "id" : "738c31b42e78a55d0078545b30c4ead5"
            },
            {
                "parent" : "0e02aa7f006ce550687d52cc7867fd09",
                "children_d" : [

                ],
                "children" : [

                ],
                "parents" : [
                    "0e02aa7f006ce550687d52cc7867fd09",
                    "4",
                    "#"
                ],
                "data" : {
                    "search" : {
                        "season" : [
                            {
                                "show" : 1,
                                "id" : "rooms"
                            },
                            {
                                "show" : 1,
                                "id" : "price"
                            },
                            {
                                "show" : 1,
                                "id" : "suites"
                            },
                            {
                                "show" : 1,
                                "id" : "areas"
                            },
                            {
                                "show" : 1,
                                "id" : "garages"
                            }
                        ],
                        "general" : [
                            {
                                "show" : 1,
                                "id" : "price"
                            },
                            {
                                "show" : 1,
                                "id" : "area"
                            },
                            {
                                "show" : 1,
                                "id" : "room"
                            },
                            {
                                "show" : 1,
                                "id" : "suites"
                            },
                            {
                                "show" : 1,
                                "id" : "garages"
                            }
                        ]
                    },
                    "types" : [
                        1,
                        2,
                        3,
                        4
                    ]
                },
                "state" : {

                },
                "a_attr" : {
                    "href" : "#"
                },
                "li_attr" : {
                    "id" : "820ffccb4937599d1d445d2063a96cb3"
                },
                "icon" : true,
                "text" : "Hotel",
                "id" : "820ffccb4937599d1d445d2063a96cb3"
            },
            {
                "parent" : "0e02aa7f006ce550687d52cc7867fd09",
                "children_d" : [

                ],
                "children" : [

                ],
                "parents" : [
                    "0e02aa7f006ce550687d52cc7867fd09",
                    "4",
                    "#"
                ],
                "data" : {
                    "search" : {
                        "season" : [
                            {
                                "show" : 1,
                                "id" : "rooms"
                            },
                            {
                                "show" : 1,
                                "id" : "price"
                            },
                            {
                                "show" : 0,
                                "id" : "suites"
                            },
                            {
                                "show" : 1,
                                "id" : "areas"
                            },
                            {
                                "show" : 1,
                                "id" : "garages"
                            }
                        ],
                        "general" : [
                            {
                                "show" : 1,
                                "id" : "price"
                            },
                            {
                                "show" : 1,
                                "id" : "area"
                            },
                            {
                                "show" : 1,
                                "id" : "room"
                            },
                            {
                                "show" : 0,
                                "id" : "suites"
                            },
                            {
                                "show" : 1,
                                "id" : "garages"
                            }
                        ]
                    },
                    "types" : [
                        1,
                        2
                    ]
                },
                "state" : {

                },
                "a_attr" : {
                    "href" : "#"
                },
                "li_attr" : {
                    "id" : "a6a1424f09550923149f7d8c98bbf206"
                },
                "icon" : true,
                "text" : "Indústria",
                "id" : "a6a1424f09550923149f7d8c98bbf206"
            },
            {
                "parent" : "0e02aa7f006ce550687d52cc7867fd09",
                "children_d" : [

                ],
                "children" : [

                ],
                "parents" : [
                    "0e02aa7f006ce550687d52cc7867fd09",
                    "4",
                    "#"
                ],
                "data" : {
                    "search" : {
                        "season" : [
                            {
                                "show" : 1,
                                "id" : "rooms"
                            },
                            {
                                "show" : 1,
                                "id" : "price"
                            },
                            {
                                "show" : 0,
                                "id" : "suites"
                            },
                            {
                                "show" : 1,
                                "id" : "areas"
                            },
                            {
                                "show" : 1,
                                "id" : "garages"
                            }
                        ],
                        "general" : [
                            {
                                "show" : 1,
                                "id" : "price"
                            },
                            {
                                "show" : 1,
                                "id" : "area"
                            },
                            {
                                "show" : 1,
                                "id" : "room"
                            },
                            {
                                "show" : 0,
                                "id" : "suites"
                            },
                            {
                                "show" : 1,
                                "id" : "garages"
                            }
                        ]
                    },
                    "types" : [
                        1,
                        2
                    ]
                },
                "state" : {

                },
                "a_attr" : {
                    "href" : "#"
                },
                "li_attr" : {
                    "id" : "4b569630500fe3d831baf95f7ecf1242"
                },
                "icon" : true,
                "text" : "Loja Shopping-Ct. Comercial",
                "id" : "4b569630500fe3d831baf95f7ecf1242"
            },
            {
                "parent" : "0e02aa7f006ce550687d52cc7867fd09",
                "children_d" : [

                ],
                "children" : [

                ],
                "parents" : [
                    "0e02aa7f006ce550687d52cc7867fd09",
                    "4",
                    "#"
                ],
                "data" : {
                    "search" : {
                        "season" : [
                            {
                                "show" : 1,
                                "id" : "rooms"
                            },
                            {
                                "show" : 1,
                                "id" : "price"
                            },
                            {
                                "show" : 0,
                                "id" : "suites"
                            },
                            {
                                "show" : 1,
                                "id" : "areas"
                            },
                            {
                                "show" : 1,
                                "id" : "garages"
                            }
                        ],
                        "general" : [
                            {
                                "show" : 1,
                                "id" : "price"
                            },
                            {
                                "show" : 1,
                                "id" : "area"
                            },
                            {
                                "show" : 1,
                                "id" : "room"
                            },
                            {
                                "show" : 0,
                                "id" : "suites"
                            },
                            {
                                "show" : 1,
                                "id" : "garages"
                            }
                        ]
                    },
                    "types" : [
                        1,
                        2,
                        4
                    ]
                },
                "state" : {

                },
                "a_attr" : {
                    "href" : "#"
                },
                "li_attr" : {
                    "id" : "f7aa648b19581260f8ce7c5af0eda014"
                },
                "icon" : true,
                "text" : "Loja-Salão",
                "id" : "f7aa648b19581260f8ce7c5af0eda014"
            },
            {
                "parent" : "0e02aa7f006ce550687d52cc7867fd09",
                "children_d" : [

                ],
                "children" : [

                ],
                "parents" : [
                    "0e02aa7f006ce550687d52cc7867fd09",
                    "4",
                    "#"
                ],
                "data" : {
                    "search" : {
                        "season" : [
                            {
                                "show" : 1,
                                "id" : "rooms"
                            },
                            {
                                "show" : 1,
                                "id" : "price"
                            },
                            {
                                "show" : 1,
                                "id" : "suites"
                            },
                            {
                                "show" : 1,
                                "id" : "areas"
                            },
                            {
                                "show" : 1,
                                "id" : "garages"
                            }
                        ],
                        "general" : [
                            {
                                "show" : 1,
                                "id" : "price"
                            },
                            {
                                "show" : 1,
                                "id" : "area"
                            },
                            {
                                "show" : 1,
                                "id" : "room"
                            },
                            {
                                "show" : 1,
                                "id" : "suites"
                            },
                            {
                                "show" : 1,
                                "id" : "garages"
                            }
                        ]
                    },
                    "types" : [
                        2
                    ]
                },
                "state" : {

                },
                "a_attr" : {
                    "href" : "#"
                },
                "li_attr" : {
                    "id" : "32eb9205694d78a51ef12c2ad1826251"
                },
                "icon" : true,
                "text" : "Motel",
                "id" : "32eb9205694d78a51ef12c2ad1826251"
            },
            {
                "parent" : "0e02aa7f006ce550687d52cc7867fd09",
                "children_d" : [

                ],
                "children" : [

                ],
                "parents" : [
                    "0e02aa7f006ce550687d52cc7867fd09",
                    "4",
                    "#"
                ],
                "data" : {
                    "search" : {
                        "season" : [
                            {
                                "show" : 1,
                                "id" : "rooms"
                            },
                            {
                                "show" : 1,
                                "id" : "price"
                            },
                            {
                                "show" : 1,
                                "id" : "suites"
                            },
                            {
                                "show" : 1,
                                "id" : "areas"
                            },
                            {
                                "show" : 1,
                                "id" : "garages"
                            }
                        ],
                        "general" : [
                            {
                                "show" : 1,
                                "id" : "price"
                            },
                            {
                                "show" : 1,
                                "id" : "area"
                            },
                            {
                                "show" : 1,
                                "id" : "room"
                            },
                            {
                                "show" : 1,
                                "id" : "suites"
                            },
                            {
                                "show" : 1,
                                "id" : "garages"
                            }
                        ]
                    },
                    "types" : [
                        1,
                        2,
                        4
                    ]
                },
                "state" : {

                },
                "a_attr" : {
                    "href" : "#"
                },
                "li_attr" : {
                    "id" : "7c0e561c05a6f2c6cb22ba8ed3736d80"
                },
                "icon" : true,
                "text" : "Pousada-Chalé",
                "id" : "7c0e561c05a6f2c6cb22ba8ed3736d80"
            },
            {
                "parent" : "0e02aa7f006ce550687d52cc7867fd09",
                "children_d" : [

                ],
                "children" : [

                ],
                "parents" : [
                    "0e02aa7f006ce550687d52cc7867fd09",
                    "4",
                    "#"
                ],
                "data" : {
                    "search" : {
                        "season" : [
                            {
                                "show" : 1,
                                "id" : "rooms"
                            },
                            {
                                "show" : 1,
                                "id" : "price"
                            },
                            {
                                "show" : 0,
                                "id" : "suites"
                            },
                            {
                                "show" : 1,
                                "id" : "areas"
                            },
                            {
                                "show" : 1,
                                "id" : "garages"
                            }
                        ],
                        "general" : [
                            {
                                "show" : 1,
                                "id" : "price"
                            },
                            {
                                "show" : 1,
                                "id" : "area"
                            },
                            {
                                "show" : 1,
                                "id" : "room"
                            },
                            {
                                "show" : 0,
                                "id" : "suites"
                            },
                            {
                                "show" : 1,
                                "id" : "garages"
                            }
                        ]
                    },
                    "types" : [
                        1,
                        2,
                        4
                    ]
                },
                "state" : {

                },
                "a_attr" : {
                    "href" : "#"
                },
                "li_attr" : {
                    "id" : "948b96cebb06c2a1f1ff523e7793b8b8"
                },
                "icon" : true,
                "text" : "Prédio Inteiro",
                "id" : "948b96cebb06c2a1f1ff523e7793b8b8"
            },
            {
                "parent" : "0e02aa7f006ce550687d52cc7867fd09",
                "children_d" : [

                ],
                "children" : [

                ],
                "parents" : [
                    "0e02aa7f006ce550687d52cc7867fd09",
                    "4",
                    "#"
                ],
                "data" : {
                    "search" : {
                        "season" : [
                            {
                                "show" : 1,
                                "id" : "rooms"
                            },
                            {
                                "show" : 1,
                                "id" : "price"
                            },
                            {
                                "show" : 0,
                                "id" : "suites"
                            },
                            {
                                "show" : 1,
                                "id" : "areas"
                            },
                            {
                                "show" : 1,
                                "id" : "garages"
                            }
                        ],
                        "general" : [
                            {
                                "show" : 1,
                                "id" : "price"
                            },
                            {
                                "show" : 1,
                                "id" : "area"
                            },
                            {
                                "show" : 1,
                                "id" : "room"
                            },
                            {
                                "show" : 0,
                                "id" : "suites"
                            },
                            {
                                "show" : 1,
                                "id" : "garages"
                            }
                        ]
                    },
                    "types" : [
                        1,
                        2,
                        4
                    ]
                },
                "state" : {

                },
                "a_attr" : {
                    "href" : "#"
                },
                "li_attr" : {
                    "id" : "50c61e3434b4d58683df763c3282c26b"
                },
                "icon" : true,
                "text" : "Studio",
                "id" : "50c61e3434b4d58683df763c3282c26b"
            },
            {
                "parent" : "4",
                "children_d" : [
                    "282852d8b3dc8752c2b7d9dcfa1988ad",
                    "9e8c84a12ecc0825aac6875179c96f98",
                    "94262c8f68340a9ac6d73d4c555ce665",
                    "43ed83b224b4ac26b30f7d714c1cb40d"
                ],
                "children" : [
                    "282852d8b3dc8752c2b7d9dcfa1988ad",
                    "9e8c84a12ecc0825aac6875179c96f98",
                    "94262c8f68340a9ac6d73d4c555ce665",
                    "43ed83b224b4ac26b30f7d714c1cb40d"
                ],
                "parents" : [
                    "4",
                    "#"
                ],
                "data" : {
                    "types" : [
                        1,
                        2,
                        4
                    ]
                },
                "state" : {

                },
                "a_attr" : {
                    "href" : "#"
                },
                "li_attr" : {
                    "id" : "2b5211c3ffb562a89a89f802475fe90d"
                },
                "icon" : true,
                "text" : "Rural",
                "id" : "2b5211c3ffb562a89a89f802475fe90d"
            },
            {
                "parent" : "2b5211c3ffb562a89a89f802475fe90d",
                "children_d" : [

                ],
                "children" : [

                ],
                "parents" : [
                    "2b5211c3ffb562a89a89f802475fe90d",
                    "4",
                    "#"
                ],
                "data" : {
                    "search" : {
                        "season" : [
                            {
                                "show" : 1,
                                "id" : "rooms"
                            },
                            {
                                "show" : 1,
                                "id" : "price"
                            },
                            {
                                "show" : 1,
                                "id" : "suites"
                            },
                            {
                                "show" : 1,
                                "id" : "areas"
                            },
                            {
                                "show" : 1,
                                "id" : "garages"
                            }
                        ],
                        "general" : [
                            {
                                "show" : 1,
                                "id" : "price"
                            },
                            {
                                "show" : 1,
                                "id" : "area"
                            },
                            {
                                "show" : 1,
                                "id" : "room"
                            },
                            {
                                "show" : 1,
                                "id" : "suites"
                            },
                            {
                                "show" : 1,
                                "id" : "garages"
                            }
                        ]
                    },
                    "types" : [
                        1,
                        2,
                        4
                    ]
                },
                "state" : {

                },
                "a_attr" : {
                    "href" : "#"
                },
                "li_attr" : {
                    "id" : "282852d8b3dc8752c2b7d9dcfa1988ad"
                },
                "icon" : true,
                "text" : "Chácara",
                "id" : "282852d8b3dc8752c2b7d9dcfa1988ad"
            },
            {
                "parent" : "2b5211c3ffb562a89a89f802475fe90d",
                "children_d" : [

                ],
                "children" : [

                ],
                "parents" : [
                    "2b5211c3ffb562a89a89f802475fe90d",
                    "4",
                    "#"
                ],
                "data" : {
                    "search" : {
                        "season" : [
                            {
                                "show" : 1,
                                "id" : "rooms"
                            },
                            {
                                "show" : 1,
                                "id" : "price"
                            },
                            {
                                "show" : 1,
                                "id" : "suites"
                            },
                            {
                                "show" : 1,
                                "id" : "areas"
                            },
                            {
                                "show" : 1,
                                "id" : "garages"
                            }
                        ],
                        "general" : [
                            {
                                "show" : 1,
                                "id" : "price"
                            },
                            {
                                "show" : 1,
                                "id" : "area"
                            },
                            {
                                "show" : 1,
                                "id" : "room"
                            },
                            {
                                "show" : 1,
                                "id" : "suites"
                            },
                            {
                                "show" : 1,
                                "id" : "garages"
                            }
                        ]
                    },
                    "types" : [
                        1,
                        2,
                        4
                    ]
                },
                "state" : {

                },
                "a_attr" : {
                    "href" : "#"
                },
                "li_attr" : {
                    "id" : "9e8c84a12ecc0825aac6875179c96f98"
                },
                "icon" : true,
                "text" : "Fazenda",
                "id" : "9e8c84a12ecc0825aac6875179c96f98"
            },
            {
                "parent" : "2b5211c3ffb562a89a89f802475fe90d",
                "children_d" : [

                ],
                "children" : [

                ],
                "parents" : [
                    "2b5211c3ffb562a89a89f802475fe90d",
                    "4",
                    "#"
                ],
                "data" : {
                    "search" : {
                        "season" : [
                            {
                                "show" : 1,
                                "id" : "rooms"
                            },
                            {
                                "show" : 1,
                                "id" : "price"
                            },
                            {
                                "show" : 1,
                                "id" : "suites"
                            },
                            {
                                "show" : 1,
                                "id" : "areas"
                            },
                            {
                                "show" : 1,
                                "id" : "garages"
                            }
                        ],
                        "general" : [
                            {
                                "show" : 1,
                                "id" : "price"
                            },
                            {
                                "show" : 1,
                                "id" : "area"
                            },
                            {
                                "show" : 1,
                                "id" : "room"
                            },
                            {
                                "show" : 1,
                                "id" : "suites"
                            },
                            {
                                "show" : 1,
                                "id" : "garages"
                            }
                        ]
                    },
                    "types" : [
                        1,
                        2
                    ]
                },
                "state" : {

                },
                "a_attr" : {
                    "href" : "#"
                },
                "li_attr" : {
                    "id" : "94262c8f68340a9ac6d73d4c555ce665"
                },
                "icon" : true,
                "text" : "Haras",
                "id" : "94262c8f68340a9ac6d73d4c555ce665"
            },
            {
                "parent" : "2b5211c3ffb562a89a89f802475fe90d",
                "children_d" : [

                ],
                "children" : [

                ],
                "parents" : [
                    "2b5211c3ffb562a89a89f802475fe90d",
                    "4",
                    "#"
                ],
                "data" : {
                    "search" : {
                        "season" : [
                            {
                                "show" : 1,
                                "id" : "rooms"
                            },
                            {
                                "show" : 1,
                                "id" : "price"
                            },
                            {
                                "show" : 1,
                                "id" : "suites"
                            },
                            {
                                "show" : 1,
                                "id" : "areas"
                            },
                            {
                                "show" : 1,
                                "id" : "garages"
                            }
                        ],
                        "general" : [
                            {
                                "show" : 1,
                                "id" : "price"
                            },
                            {
                                "show" : 1,
                                "id" : "area"
                            },
                            {
                                "show" : 1,
                                "id" : "room"
                            },
                            {
                                "show" : 1,
                                "id" : "suites"
                            },
                            {
                                "show" : 1,
                                "id" : "garages"
                            }
                        ]
                    },
                    "types" : [
                        1,
                        2,
                        4
                    ]
                },
                "state" : {

                },
                "a_attr" : {
                    "href" : "#"
                },
                "li_attr" : {
                    "id" : "43ed83b224b4ac26b30f7d714c1cb40d"
                },
                "icon" : true,
                "text" : "Sítio",
                "id" : "43ed83b224b4ac26b30f7d714c1cb40d"
            }
        ]
    },
    "created" : "2014-02-26T11:59:54.850+0000",
    "daysToCloseJob" : 0,
    "daysToUnpublishJob" : 0,
    "daysToWarnCloseJob" : 0,
    "daysToWarnUnpublishJob" : 0,
    "faceAppId" : "",
    "faceAppSecret" : "",
    "faceToken" : "",
    "hoursLimitRecruiterSearch" : 0,
    "modified" : "2016-03-17T19:50:36.942+0000",
    "publishDays" : 15,
    "publishQty" : 1,
    "sendEmailUser" : "52aa07751e7ca00000000001",
    "suggestionsPerWorkPlace" : null,
    "publishJobToFacebook" : false,
    "googleApiKey" : ""
};

describe('Config Tests', function() {
    this.timeout(15000);
    before(function(done) {
        // runs before all tests in this block
        HD.init({
            domains: require('../domains')
        });
        HD.log().init(HD.serverconfig().log.name, HD.serverconfig().log.options, (err, aTransports) => {
            done();
        });
    });

    it('Init Mongo', function (done) {
        Mongo.setConfig({ host: 'mongodb://localhost/testdb' });
        Mongo.connect(() => {
            expect(Mongo.status()).is.equal(1); // connected
            // drop the database
            done();
        });
    });

    it('remove config', function (done) {
        config = require('../domains/config/modules/config');
        expect(config).is.not.undefined;
        expect(config.crudmongo).is.not.undefined;
        config.crudmongo.DIRECT().remove({}, (err, retData) => {
            expect(err).is.null;
            expect(retData).is.not.undefined;
            expect(retData).is.not.empty;
            expect(retData.result).is.not.empty;
            expect(retData.result.ok).is.equal(1);
            done();
        });
    });

    it('add config', function (done) {
        expect(config).is.not.undefined;
        expect(config.crudmongo).is.not.undefined;
        config.crudmongo.DIRECT().create(configData, (err, retData) => {
            expect(err).is.null;
            expect(retData).is.not.undefined;
            expect(retData).is.not.empty;
            expect(retData.categories).is.not.empty;
            done();
        });
    });

    it('getGlobal', function (done) {
        expect(config).is.not.undefined;
        config.getGlobal((err, retData) => {
            expect(err).is.null;
            expect(retData).is.not.undefined;
            expect(retData).is.not.empty;
            expect(retData.categories).is.undefined;
            done();
        });
    });
});
