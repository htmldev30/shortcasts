const Card = ({ children, cardTitle }) => {
    return (
        <>
            <div className="overflow-hidden px-4 py-16">
                <div className="flex flex-col items-center justify-between">
                    <div className="w-full max-w-xl xl:px-8 xl:w-5/12">
                        <div className="relative">
                            <div className="relative bg-white rounded shadow-2xl p-7 sm:p-10">
                                <h3 className="mb-4 text-left font-bold sm:text-center sm:mb-6 sm:text-xl">
                                    {cardTitle}
                                </h3>
                                {children}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Card
